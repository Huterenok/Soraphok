import { Controller, Get, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { UserRegisterDto } from "./dto/userRegister.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return "hello";
  }

  @Post("register")
  register(@Body() registerUserDto: UserRegisterDto) {
    const res = this.authService.registerUser(registerUserDto);
    return res;
  }
}
