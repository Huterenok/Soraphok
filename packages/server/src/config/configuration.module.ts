import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { GraphQLCongifModule } from "./graphql/graphql.module";
import { DatabaseModule } from "./database/database.module";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: `.env` }),

		DatabaseModule,
		GraphQLCongifModule,
	]
})
export class ConfigurationModule {}