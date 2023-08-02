import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "src/graphql";
import { UsersService } from "./users.service";

@Resolver("User")
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query("getAllUsers")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query("getUserByEmail")
  async getUserByEmail(@Args("email") email: string) {
    return this.userService.getUserByEmail(email);
  }

	@Query("getUserByUsername")
  async getUserByUsername(@Args("username") username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Mutation("createUser")
  async createUser(@Args("input") args: User) {
    return this.userService.createUser(args);
  }

	// @Mutation("changeUser")
	// async changeUser(@Args("input") args: User) {
	// 	return this.userService.changeUser(args)
	// }
}
