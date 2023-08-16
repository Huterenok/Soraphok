import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "src/modules/auth/guard/jwtAuthGuard";
import { UsersService } from "./users.service";
import { TOKEN } from "src/modules/auth/decorator/token";
import { CreateUser, Token, UpdateUser } from "src/types/graphql";
import { AlreadyTeacher, UserByUsernameNotFound, UserByIdNotFound, UserNotFound} from "./exception";

@Resolver("User")
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  async getUserByEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  async createUser(args: CreateUser) {
    return this.userService.createUser(args);
  }

	@Query("whoami")
	@UseGuards(JwtAuthGuard)
	async whoami(@TOKEN() token: Token) {
    return this.userService.getUserById(token.id);
  }

  @Query("getAllUsers")
  async getAllUsers(@Args("limit") limit: number = 30) {
    return this.userService.getAllUsers(limit);
  }

  @Query("getUserById")
  async getUserById(@Args("id") id: number) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new UserByIdNotFound(id);
    }
    return user;
  }

  @Query("getUserByUsername")
  async getUserByUsername(@Args("username") username: string) {
    const user = this.userService.getUserByUsername(username);
    if (!user) {
      throw new UserByUsernameNotFound(username);
    }
    return user;
  }

  @Mutation("updateUser")
  @UseGuards(JwtAuthGuard)
  async updateUser(@TOKEN() token: Token, @Args("input") args: UpdateUser) {
    console.log(token);
    return this.userService.changeUser(token.id, args);
  }

  @Mutation("becomeTeacher")
  @UseGuards(JwtAuthGuard)
  async becomeTeacher(@TOKEN() token: Token) {
    const user = await this.userService.getUserById(token.id);
    if (!user) {
      throw new UserNotFound();
    } else if (user.isTeacher) {
      throw new AlreadyTeacher();
    }
    return this.userService.becomeTeacher(user.id);
  }
}
