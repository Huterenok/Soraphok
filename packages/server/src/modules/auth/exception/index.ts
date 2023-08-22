import { HttpException, HttpStatus } from "@nestjs/common";

export class NotAuthorized extends HttpException {
  constructor() {
    super("Not Authorized", HttpStatus.UNAUTHORIZED);
  }
}

export class WrongAuthCredentials extends HttpException {
  constructor() {
    super("Wrong auth credentials", HttpStatus.BAD_REQUEST);
  }
}
