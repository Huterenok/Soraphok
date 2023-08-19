import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { ArticlesService } from "../articles.service";
import {
  ArticleByIdNotFound,
  FolderByIdNotFound,
  NotAllowed,
} from "../exception";

//TODO: merge two guards
@Injectable()
export class ArticleAllowanceGuard implements CanActivate {
  constructor(protected readonly articleService: ArticlesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    try {
      //TODO
      const article = await this.articleService.getArticleById(req.body.id);
      if (article && article.authorId != req.token.id) {
        throw new NotAllowed();
      }
      //For Move action to be sure that sender is owner of folder
      if (req.body.folderId) {
        const folderById = await this.articleService.getFolderById(
          req.body.folderId,
        );
        if (!folderById) {
          throw new FolderByIdNotFound(req.body.folderId);
        }
        if (folderById.authorId != req.token.id) {
          throw new NotAllowed();
        }
      }
      req.article = article;

      return true;
    } catch (_) {
      throw new NotAllowed();
    }
  }
}

@Injectable()
export class FolderAllowanceGuard implements CanActivate {
  constructor(protected readonly articleService: ArticlesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    try {
      const folder = await this.articleService.getFolderById(req.body.id);
      if (folder && folder.authorId != req.token.id) {
        throw new NotAllowed();
      }
      //For Move action to be sure that sender is owner of folder
      if (req.body.folderId) {
        const folderById = await this.articleService.getFolderById(
          req.body.folderId,
        );
        if (!folderById) {
          throw new FolderByIdNotFound(req.body.folderId);
        }
        if (folderById.authorId != req.token.id) {
          throw new NotAllowed();
        }
      }
      req.folder = folder;

      return true;
    } catch (e) {
      throw new NotAllowed();
    }
  }
}
