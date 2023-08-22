import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { UsersService } from "../users.service";
import { UserNotFound } from "../exception";

@Injectable()
export class UserExistenceGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    try {
      const user = await this.userService.getUserById(req.token.id);
      if (!user) {
        throw new UserNotFound();
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
