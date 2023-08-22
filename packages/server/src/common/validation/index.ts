import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";

class CustomValidationError extends HttpException {
  message;
  constructor(error: string) {
    super(error, HttpStatus.BAD_REQUEST);
    this.message = error;
  }
}

export const exceptionFactory = (
  errors: ValidationError[],
): any | undefined => {
  const messages = errors.map((err) => {
    return `${Object.values(err.constraints!).join(", ")}`;
  });
  throw new CustomValidationError(messages.join(". "));
};
