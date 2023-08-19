import { Module } from "@nestjs/common";

import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ArticlesModule } from "./modules/articles/articles.module";

import { ConfigurationModule } from "./config/configuration.module";

@Module({
  imports: [AuthModule, UsersModule, ArticlesModule, ConfigurationModule]
})
export class AppModule {}
