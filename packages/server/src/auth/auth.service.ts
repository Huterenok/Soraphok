import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { UserCreationDto } from "src/users/dto/userCreation.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserCreationDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        "User with this email already exists",
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

  async login(dto: UserCreationDto) {
		const user = await this.validateUser(dto);
		return this.generateToken(user);
	}

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

	private async validateUser(dto: UserCreationDto) {
			const user = await this.usersService.getUserByEmail(dto.email);
			if(user && await bcrypt.compare(dto.password, user.password)) {
				return user;
			} else {
				throw new UnauthorizedException({message: "Incorrect password or email"});
			}
	}
}