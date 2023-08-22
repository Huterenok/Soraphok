import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ArticlesModule } from "./articles/articles.module";

import { ConfigurationModule } from "../config/configuration.module";

@Module({
  imports: [AuthModule, UsersModule, ArticlesModule, ConfigurationModule],
})
export class AppModule {}
