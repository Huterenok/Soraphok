import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";

import { GraphQLCongifModule } from "./graphql/graphql.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "public"),
    }),

    DatabaseModule,
    GraphQLCongifModule,
  ],
})
export class ConfigurationModule {}
