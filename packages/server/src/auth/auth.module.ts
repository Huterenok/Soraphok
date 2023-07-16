import { Global, Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";

@Global()
@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  controllers: [],
  providers: [AuthResolver, AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
