import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
	IsEmail,
} from "class-validator";

export class UserCreationDto {
  @ApiProperty({ example: "bebra@gmail.com", description: "Unique email" })
  @IsString({message: "Email must be string"})
	@IsEmail({}, {message: "Incorrect email form"})
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "bebra228", description: "Password" })
  @IsString({message: "Password must be string"})
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "MonstrBebra", description: "Unique username" })
  @IsString({message: "Username must be string"})
  @IsNotEmpty()
  @MaxLength(18)
  username: string;

  @ApiProperty({ example: "I like bananas", description: "User's biography" })
  @IsString({message: "Bio must be string"})
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  bio?: string;

  //FIX
  @ApiProperty({
    example:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Biei-tree2_2003.jpg/200px-Biei-tree2_2003.jpg",
    description: "User's avatar",
  })
  @IsString({message: "Avatar must be string"})
  @IsOptional()
  @IsNotEmpty()
  avatar?: string;
}
