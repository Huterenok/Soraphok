import { Resolver, Mutation, Args } from "@nestjs/graphql";

import { AuthService } from "./auth.service";

import { AuthPayloadDto, LoginUserDto, RegisterUserDto } from "./dto";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthPayloadDto, {nullable: true})
  async register(@Args("input") input: RegisterUserDto) {
    return this.authService.register(input);
  }

  @Mutation((returns) => AuthPayloadDto, {nullable: true})
  async login(@Args("input") input: LoginUserDto) {
    return this.authService.login(input);
  }
}
