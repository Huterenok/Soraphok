import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { UserCreationDto } from "src/users/dto/userCreation.dto";
import { AuthService } from "./auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: "Registration of new user" })
  @Post("register")
  register(@Body() dto: UserCreationDto) {
    return this.authService.register(dto);
  }

	@ApiOperation({ summary: "User login" })
  @Post("login")
  login(@Body() dto: UserCreationDto) {
		return this.authService.login(dto);
	}
}
