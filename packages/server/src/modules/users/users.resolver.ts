import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { UserByIdNotFound, UserByUsernameNotFound } from "./exception";

import { AuthToken } from "src/modules/auth/decorator/authToken";
import { JwtAuthGuard } from "src/modules/auth/guard/jwtAuthGuard";

import { CreateUser, Token, UpdateUser, User} from "src/types/graphql";

@Resolver("User")
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  async getUserByEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  async createUser(args: CreateUser) {
    return this.userService.createUser(args);
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async whoami(@AuthToken() token: Token) {
    return this.userService.getUserById(token.id);
  }

  @Query()
  async getAllUsers(@Args("limit") limit: number = 30) {
    return this.userService.getAllUsers(limit);
  }

  @Query()
  async getUserById(@Args("id") id: number) {
    const user = await this.userService.getUserById(id);
		if (!user) {
      throw new UserByIdNotFound(id);
    }
		return user;
  }

  @Query()
  async getUserByUsername(@Args("username") username: string) {
    const user =  this.userService.getUserByUsername(username);
		if (!user) {
      throw new UserByUsernameNotFound(username);
    }
		return user;
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async updateUser(@AuthToken() token: Token, @Args("input") args: UpdateUser) {
    return this.userService.updateUser(token.id, args);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async becomeTeacher(@AuthToken() token: Token) {
    return this.userService.becomeTeacher(token.id);
  }
}
