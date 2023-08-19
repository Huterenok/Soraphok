import { AuthService } from "./auth.service";

import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { LoginUser, RegisterUser } from "src/types/graphql";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async register(@Args("input") input: RegisterUser) {
    return this.authService.register(input);
  }

  @Mutation()
  async login(@Args("input") input: LoginUser) {
    return this.authService.login(input);
  }
}
