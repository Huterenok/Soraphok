import { HttpException, HttpStatus } from "@nestjs/common";

export class NotAuthorized extends HttpException {
  constructor() {
    super("Not Authorized", HttpStatus.UNAUTHORIZED);
  }
}