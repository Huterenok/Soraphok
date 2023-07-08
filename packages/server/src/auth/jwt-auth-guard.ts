import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization.split(" ");
      const bearer = authHeader[0];
      const token = authHeader[1];

      if (bearer != "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User is not logged in" });
      }

			const user = this.jwtService.verify(token);
			req.user = user;
			return true;
    } catch (_) {
      throw new UnauthorizedException({ message: "User is not logged in" });
    }
  }
}
