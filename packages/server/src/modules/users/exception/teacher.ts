//TODO: name of file
import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyTeacher extends HttpException {
  constructor() {
    super("User is already teacher", HttpStatus.BAD_REQUEST);
  }
}
