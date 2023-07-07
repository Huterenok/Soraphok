import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

import { UserRegisterDto } from "./dto/userRegister.dto";

@Injectable()
export class AuthService {
  constructor(private database: DatabaseService) {}

  async registerUser(registerUserDto: UserRegisterDto) {
    console.log(registerUserDto);
    let res = await this.database.user.create({ data: registerUserDto });
    return res;
  }
}
