import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyExists extends HttpException {
  constructor(response: string = "User already exists") {
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export class AlreadyExistsWithUsername extends AlreadyExists {
  constructor(username: string) {
    super(`User with ${username} username already exists`);
  }
}

export class AlreadyExistsWithEmail extends AlreadyExists {
  constructor(email: string) {
    super(`User with ${email} email already exists`);
  }
}
