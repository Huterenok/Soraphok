import { Injectable } from "@nestjs/common";

import {
  AlreadyTeacher,
  UserByIdNotFound,
  UserByUsernameNotFound,
} from "./exception";

import { DatabaseService } from "src/config/database/database.service";

import { CreateUser, UpdateUser } from "src/types/graphql";

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async createUser(dto: CreateUser) {
    const user = await this.database.user.create({ data: dto });
    return user;
  }

  async getAllUsers(limit: number) {
    const users = await this.database.user.findMany({
      take: limit,
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.database.user.findFirst({ where: { id } });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.database.user.findFirst({ where: { email } });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.database.user.findFirst({ where: { username } });
    return user;
  }

  async updateUser(id: number, dto: UpdateUser) {
    const user = this.database.user.update({
      where: {
        id,
      },
      data: dto,
    });
    return user;
  }

  async becomeTeacher(id: number) {
    const userById = await this.getUserById(id);

    if (!userById) {
      throw new UserByIdNotFound(id);
    } else if (userById.isTeacher) {
      throw new AlreadyTeacher();
    }

    const user = this.database.user.update({
      where: {
        id,
      },
      data: {
        isTeacher: true,
      },
    });
    return user;
  }
}
