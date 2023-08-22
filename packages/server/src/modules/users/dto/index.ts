import { Field, InputType, ObjectType } from "@nestjs/graphql";
// import * as GraphQLUpload from 'graphql-upload';

import {
  IsEmail,
  IsOptional,
  Length,
  MaxLength,
} from "class-validator";
import { Stream } from "stream";

@ObjectType()
export class UserResponseDto {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: false })
  role: string;

  @Field({ nullable: false })
  isTeacher: boolean;

  @Field({ nullable: false })
  isBanned: boolean;

  @Field({ nullable: true })
  banReason: string;
}

@InputType()
export class CreateUserDto {
  @Field({ nullable: false })
  @IsEmail({}, { message: "Email must be valid" })
  email: string;

  @Field({ nullable: false })
  @Length(4, 24, { message: "Username must consist of 4 to 24 characters" })
  username: string;

  @Field({ nullable: false })
  @Length(4, 24, { message: "Password must consist of 4 to 24 characters" })
  password: string;
}

//TODO
interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @MaxLength(120, { message: "Bio must be up to 120 characters" })
  @IsOptional()
  bio: string;
	
  // @Field(() => GraphQLUpload, { nullable: true })
  // @IsOptional()
  // avatar: Promise<FileUpload>;
}
