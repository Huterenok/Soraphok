import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from "class-validator";

export class UserRegisterDto {
	@IsString()
  @IsNotEmpty()
  email: string;

	@IsString()
  @IsNotEmpty()
	@MinLength(6)
  password: string;

	@IsString()
  @IsNotEmpty()
	@MaxLength(18)
  username: string;

	@IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  bio?: string;

	@IsString()
  @IsOptional()
  @IsNotEmpty()
  avatar?: string;
}
