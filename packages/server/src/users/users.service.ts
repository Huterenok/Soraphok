import { Injectable } from "@nestjs/common";

import { DatabaseService } from "src/database/database.service";
import { CreateUser, User } from "src/graphql";

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async createUser(dto: CreateUser) {
		const user = await this.database.user.create({data: dto});
		return user;
	}

  async getAllUsers() {
		const users = await this.database.user.findMany();
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.database.user.findFirst({where: {email}})
		return user;
	}

	async getUserByUsername(username: string) {
		const user = await this.database.user.findFirst({where: {username}})
		return user;
	}

	// async changeUser(dto: CreateUser) {
	// 	//TODO Validate
	// 	const user = this.database.user.update({
	// 		where: {
	// 			email: dto.email,
	// 		},
	// 		data: dto
	// 	});
	// }
}
