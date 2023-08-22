import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { UserExistenceGuard } from "./guard/userExistence.guard";
import {
  UserByIdNotFound,
  UserByUsernameNotFound,
  UserNotFound,
} from "./exception";

import { AuthToken } from "src/modules/auth/decorator/authToken.decorator";
import { JwtAuthGuard } from "src/modules/auth/guard/jwtAuth.guard";

import { User } from "src/entities";
import { UpdateUserDto, UserResponseDto } from "./dto";
import { Token } from "../auth/types";
import { GraphQLUpload, Upload } from "graphql-upload-minimal";
import { join } from "path";
import { createWriteStream } from "fs";

@Resolver("User")
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async whoami(@AuthToken() token: Token) {
    const user = this.userService.getUserById(token.id);
    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }

  @Query((returns) => [UserResponseDto])
  async getAllUsers(
    @Args("limit", { type: () => Int, nullable: true }) limit: number = 30,
  ) {
    return this.userService.getAllUsers(limit);
  }

  @Query((returns) => UserResponseDto, { nullable: true })
  async getUserById(@Args("id") id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new UserByIdNotFound(id);
    }
    return user;
  }

  @Query((returns) => UserResponseDto, { nullable: true })
  async getUserByUsername(@Args("username") username: string) {
    const user = this.userService.getUserByUsername(username);
    if (!user) {
      throw new UserByUsernameNotFound(username);
    }
    return user;
  }

  @Mutation((returns) => UserResponseDto)
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  async updateUser(
    @AuthToken() token: Token,
    //TODO: update with file
    @Args("input", { nullable: true }) input: UpdateUserDto,
  ) {
    return this.userService.updateUser(token.id, input);
  }

  @Mutation((returns) => UserResponseDto)
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  async becomeTeacher(@AuthToken() token: Token) {
    return this.userService.becomeTeacher(token.id);
  }


	//TEST
  @Mutation((returns) => Int)
  async uploadFile(
    @Args({ name: "image", type: () => GraphQLUpload })
    image: Upload,
  ) {
    const file = await image.file;
    const path = join(process.cwd(), `public/user/avatar/${file?.filename}`);

    console.log("UPLOAD_IMAGE_CALLED", {
      file,
    });

    file!
      .createReadStream()
      .pipe(createWriteStream(path))
      .on("finish", () => {
        console.log("IMAGE_CREATED_IN_DIRECTORY");
      });

    1;
  }
}
