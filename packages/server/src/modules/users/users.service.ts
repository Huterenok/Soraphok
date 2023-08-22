import { Injectable } from "@nestjs/common";

import { DatabaseService } from "src/config/database/database.service";

import { AlreadyTeacher, UserByIdNotFound } from "./exception";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.database.user.create({
      data: dto,
    });
    return user;
  }

	async getUserByEmail(email: string) {
    const user = await this.database.user.findFirst({
      where: { email },
    });
    return user;
  }

  async getAllUsers(limit: number) {
    const users = await this.database.user.findMany({
      take: limit,
    });
    return users as UserResponseDto[];
  }

  async getUserById(id: number) {
    const user = await this.database.user.findFirst({
      where: { id },
    });
    return user as UserResponseDto;
  }

  async getUserByUsername(username: string) {
    const user = await this.database.user.findFirst({
      where: { username },
    });
    return user as UserResponseDto;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.database.user.update({
      where: {
        id,
      },
			//TODO: update with path to file
      data: {
				bio: dto.bio
			},
    });
    return user as UserResponseDto;
  }

  async becomeTeacher(id: number) {
    const userById = await this.getUserById(id);

    if (!userById) {
      throw new UserByIdNotFound(id);
    } else if (userById.isTeacher) {
      throw new AlreadyTeacher();
    }

    const user = await this.database.user.update({
      where: {
        id,
      },
      data: {
        isTeacher: true,
      },
    });
    return user as UserResponseDto;
  }
}
