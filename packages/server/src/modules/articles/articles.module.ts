import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/config/database/database.module";
import { ArticlesService } from "./articles.service";
import { ArticlesResolver } from "./articles.resolver";

@Module({
  imports: [DatabaseModule],
  providers: [ArticlesResolver, ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
