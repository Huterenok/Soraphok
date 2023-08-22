import { Field, InputType, ObjectType, } from "@nestjs/graphql"
import { IsEmail, Length } from "class-validator"

@ObjectType()
export class AuthPayloadDto {
	@Field({ nullable: false })
	token: string
}

@InputType()
export class LoginUserDto {
	@Field({ nullable: false })
	@IsEmail({}, {message: "Email must be valid"})
  email: string
	
	@Field({ nullable: false })
	@Length(4, 24, {message: "Password must consist of 4 to 24 characters"})
  password: string
}

@InputType()
export class RegisterUserDto {
	@Field({ nullable: false })
	@IsEmail({}, {message: "Email must be valid"})

  email: string
	@Field({ nullable: false })
	@Length(4, 24, {message: "Password must consist of 4 to 24 characters"})
  password: string

	@Field({ nullable: false })
	@Length(4, 24, {message: "Username must consist of 4 to 24 characters"})
  username: string
}
