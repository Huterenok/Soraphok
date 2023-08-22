import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { ArticlesService } from "../articles.service";

import {
  ArticleByIdNotFound,
  FolderByIdNotFound,
  NotAllowed,
} from "../exception";
import { retrieveFolderId, retrieveId } from "../utils/retrieveGqlData";

import { Token } from "src/modules/auth/types";

export class AllowanceGuard {
  //TODO: type this
  req: any;
  id: number | null;
  folderId: number | null;
  token: Token;

  constructor(protected readonly articleService: ArticlesService) {}

  init(context: ExecutionContext) {
    const { req } = GqlExecutionContext.create(context).getContext();
    this.req = req;
    this.id = retrieveId(req.body.query);
    this.folderId = retrieveFolderId(req.body.query);
    this.token = req.token;
  }

  async canAddToFolder() {
    try {
      if (this.folderId) {
        const folderById = await this.articleService.getFolderById(
          this.folderId,
        );
        if (!folderById) {
          throw new FolderByIdNotFound(this.folderId);
        } else if (folderById.authorId != this.token.id) {
          throw new NotAllowed();
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

@Injectable()
export class ArticleAllowanceGuard
  extends AllowanceGuard
  implements CanActivate
{
  constructor(protected readonly articleService: ArticlesService) {
    super(articleService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.init(context);

    try {
			await this.canAddToFolder()

      if (this.id) {
        const article = await this.articleService.getArticleById(this.id);
        if (!article) {
          throw new ArticleByIdNotFound(this.id);
        } else if (article.authorId != this.token.id) {
          throw new NotAllowed();
        }
        this.req.article = article;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

@Injectable()
export class FolderAllowanceGuard extends AllowanceGuard {
  constructor(protected readonly articleService: ArticlesService) {
    super(articleService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
		this.init(context);

    try {
			await this.canAddToFolder()

      if (this.id) {
        const folder = await this.articleService.getFolderById(this.id);
        if (!folder) {
          throw new FolderByIdNotFound(this.id);
        } else if (folder.authorId != this.token.id) {
          throw new NotAllowed();
        }
        this.req.folder = folder;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
