import { Module } from "@nestjs/common";

import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ConfigurationModule } from "./config/configuration.module";

@Module({
  imports: [AuthModule, UsersModule, ConfigurationModule],
})
export class AppModule {}
