import { Field, InputType, Int } from "@nestjs/graphql";
import { Length, MaxLength, IsOptional } from "class-validator";

@InputType()
export class CreateArticleDto {
  @Field({ nullable: false })
  @Length(4, 24, { message: "Title must consist of 4 to 24 characters" })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field((type) => Int, { nullable: false })
  folderId: number;
}

@InputType()
export class UpdateArticleDto {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  @Length(4, 24, { message: "Title must consist of 4 to 24 characters" })
	@IsOptional()
  title: string;

  @Field({ nullable: true })
	@IsOptional()
  content: string;
}

@InputType()
export class MoveArticleDto {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field((type) => Int, { nullable: false })
  folderId: number;
}

@InputType()
export class DeleteArticleDto {
  @Field((type) => Int, { nullable: false })
  id: number;
}

@InputType()
export class CreateFolderDto {
  @Field((type) => Int, { nullable: true })
  folderId: number;

  @Field({ nullable: false })
  @Length(4, 24, { message: "Name must consist of 4 to 24 characters" })
  name: string;

  @Field({ nullable: false })
  @MaxLength(120, {
    message: "Description length must be up to 120 characters",
  })
  description: string;
}

@InputType()
export class UpdateFolderDto {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  @Length(4, 24, { message: "Name must consist of 4 to 24 characters" })
	@IsOptional()
  name: string;

  @Field({ nullable: true })
  @MaxLength(120, {
    message: "Description length must be up to 120 characters",
  })
	@IsOptional()
  description: string;
}

@InputType()
export class MoveFolderDto {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field((type) => Int, { nullable: false })
  folderId: number;
}

@InputType()
export class DeleteFolderDto {
  @Field((type) => Int, { nullable: false })
  id: number;
}
