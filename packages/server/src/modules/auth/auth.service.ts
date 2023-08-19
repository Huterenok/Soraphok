import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

//TODO
import { UsersService } from "src/modules/users/users.service";
import { User } from "@prisma/client";

import { NotAuthorized } from "./exception";

import { LoginUser, RegisterUser } from "src/types/graphql";
import {
  AlreadyExistsWithEmail,
  AlreadyExistsWithUsername,
} from "../users/exception";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUser) {
    const candidateByEmail = await this.usersService.getUserByEmail(dto.email);
    const candidateByUsername = await this.usersService.getUserByUsername(
      dto.username,
    );

    if (candidateByEmail) {
      throw new AlreadyExistsWithEmail(dto.email);
    } else if (candidateByUsername) {
      throw new AlreadyExistsWithUsername(dto.username);
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      Number(process.env.SALT),
    );
    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login(dto: LoginUser) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private async validateUser(dto: RegisterUser | LoginUser) {
    const user = await this.usersService.getUserByEmail(dto.email);

    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return user;
    } else {
      throw new NotAuthorized();
    }
  }

  private generateToken(user: User) {
    const payload = { id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
