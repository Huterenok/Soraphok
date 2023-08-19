import { HttpException, HttpStatus } from "@nestjs/common";


export class NotAllowed extends HttpException {
	constructor() {
		//TODO
		super("Not Allowed", HttpStatus.METHOD_NOT_ALLOWED)
	}
}