import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { UsersService } from "src/users/users.service";

import { LoginUser, RegisterUser, User } from "src/graphql";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUser) {
    console.log(dto);
    const candidateByEmail = await this.usersService.getUserByEmail(dto.email);
    const candidateByUsername = await this.usersService.getUserByUsername(
      dto.username,
    );
    if (candidateByEmail) {
      throw new HttpException(
        "User with this email already exists",
        HttpStatus.BAD_REQUEST,
      );
    } else if (candidateByUsername) {
      throw new HttpException(
        "User with this username already exists",
        HttpStatus.BAD_REQUEST,
      );
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

  private generateToken(user: RegisterUser | LoginUser) {
    const payload = { email: user.email, id: user.password };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: RegisterUser | LoginUser) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException({
        message: "Incorrect password or email",
      });
    }
  }
}
