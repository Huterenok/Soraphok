import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFound extends HttpException {
  constructor(response: string = "User was not found") {
    super(response, HttpStatus.NOT_FOUND);
  }
}

export class UserByIdNotFound extends UserNotFound {
  constructor(id: number) {
    super(`User by ${id} id was not found`);
  }
}

export class UserByUsernameNotFound extends UserNotFound {
  constructor(username: string) {
    super(`User by ${username} id was not found`);
  }
}
