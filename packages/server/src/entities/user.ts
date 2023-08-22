import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
	@Field((type) => ID!)
	id: number 

	@Field((type) => String, {nullable: false})
  username: string

	@Field((type) => String, {nullable: false})
  password: string

	@Field((type) => String, {nullable: false})
  email: string

	@Field((type) => String, {nullable: true})
  bio: string

	@Field((type) => String, {nullable: true})
  avatar: string

	@Field((type) => String, {nullable: false})
  role: string

	@Field((type) => Boolean, {nullable: false})
  isTeacher: boolean

	@Field((type) => Boolean, {nullable: false})
  isBanned: boolean

	@Field((type) => String, {nullable: true})
  banReason: string
}