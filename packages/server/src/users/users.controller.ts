import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserCreationDto } from "./dto/userCreation.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({
    status: 200,
    //FIX
    // type: User
  })
	@UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: UserCreationDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: "Receiving all users" })
  @ApiResponse({
    status: 200,
    //FIX
    // type: User
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
