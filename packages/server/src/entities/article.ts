import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Article {
	@Field((type) => Int, {nullable: false})
	id: number 

	@Field((type) => String, {nullable: false})
  title: string

	@Field((type) => String, {nullable: false})
  content: string

	@Field((type) => Int, {nullable: false})
	authorId: number

	@Field((type) => Int, {nullable: false})
	folderId: number

	@Field((type) => Int, {nullable: false})
	likes: number
}

@ObjectType()
export class Folder {
	@Field((type) => Int, {nullable: false})
	id: number 

	@Field((type) => String, {nullable: false})
  name: string

	@Field((type) => String, {nullable: false})
  description: string

	@Field((type) => Int, {nullable: false})
	authorId: number

	@Field((type) => Int, {nullable: true})
	folderId: number | null

	@Field((type) => Int, {nullable: false})
	likes: number
}