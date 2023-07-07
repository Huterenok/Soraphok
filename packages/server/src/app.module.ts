import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
