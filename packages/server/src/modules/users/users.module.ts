import { Module, forwardRef } from "@nestjs/common";

import { UsersService } from "./users.service";
import { DatabaseModule } from "src/config/database/database.module";
import { UsersResolver } from "./users.resolver";

@Module({
  imports: [DatabaseModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
