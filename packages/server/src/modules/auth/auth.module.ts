import { Global, Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

import { UsersModule } from "src/modules/users/users.module";

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
  providers: [AuthResolver, AuthService],
	exports: [JwtModule]
})
export class AuthModule {}
