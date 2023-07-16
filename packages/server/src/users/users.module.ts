import { Module, forwardRef } from "@nestjs/common";

import { UsersService } from "./users.service";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "src/auth/auth.module";
import { UsersResolvers } from "./users.resolver";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [UsersResolvers, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
