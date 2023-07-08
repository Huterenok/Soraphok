import { Injectable } from "@nestjs/common";

import { DatabaseService } from "src/database/database.service";
import { UserCreationDto } from "./dto/userCreation.dto";

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async createUser(dto: UserCreationDto) {
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
}