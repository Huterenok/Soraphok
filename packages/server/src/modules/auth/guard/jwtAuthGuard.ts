import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

import { NotAuthorized } from "../exception";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    try {
      const authHeader = req.headers.authorization.split(" ");
      const bearer = authHeader[0];
      const token = authHeader[1];

      if (bearer != "Bearer" || !token) {
        throw new NotAuthorized();
      }

      const user_token = this.jwtService.verify(token);
      req.token = user_token;
      return true;
    } catch (_) {
      throw new NotAuthorized();
    }
  }
}
