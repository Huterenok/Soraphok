import { Module, forwardRef } from "@nestjs/common";

import { DatabaseModule } from "src/config/database/database.module";
import { ArticlesService } from "./articles.service";

@Module({
  imports: [DatabaseModule],
  providers: [ArticlesService],
  exports: [],
})
export class ArticlesModule {}
