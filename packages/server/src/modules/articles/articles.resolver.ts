import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ArticlesService } from "./articles.service";
import {
  ArticleByIdNotFound,
  ArticleByTitleNotFound,
  ArticleNotFound,
  FavouriteArticlesNotFound,
  FolderByIdNotFound,
} from "./exception";
import {
  ArticleAllowanceGuard,
  FolderAllowanceGuard,
} from "./guard/allowanceGuard";
import { ArticleExt, FolderExt } from "./decorator";

import { JwtAuthGuard } from "../auth/guard/jwtAuthGuard";
import { AuthToken } from "../auth/decorator/authToken";

import {
  Article,
  CreateArticle,
  CreateFolder,
  DeleteArticle,
  DeleteFolder,
  MoveArticle,
  MoveFolder,
  Token,
  UpdateArticle,
	UpdateFolder,
} from "src/types/graphql";
import {
  FavouriteFoldersNotFound,
  FolderNotFound,
  FoldersByNameNotFound,
} from "./exception/notFound";

@Resolver("Article")
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  //-----------Articles-------------
  @Query()
  async getAllArticles(@Args("limit") limit: number) {
    return this.articlesService.getAllArticles(limit);
  }

  @Query()
  async getArticleById(@Args("id") id: number) {
    const article = await this.articlesService.getArticleById(id);
    if (!article) {
      throw new ArticleByIdNotFound(id);
    }
    return article;
  }

  @Query()
  async getArticlesByTitle(@Args("title") title: string) {
    const articles = await this.articlesService.getArticlesByTitle(title);
    if (articles.length == 0) {
      throw new ArticleByTitleNotFound(title);
    }
    return articles;
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async getFavouriteArticles(@AuthToken() token: Token) {
    const articles = await this.articlesService.getFavouriteArticles(token.id);
    if (articles.length == 0) {
      throw new FavouriteArticlesNotFound();
    }
    return articles;
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async getMyArticles(@AuthToken() token: Token) {
    const articles = await this.articlesService.getMyArticles(token.id);
    if (articles.length == 0) {
      throw new ArticleNotFound();
    }
    return articles;
  }

	@Mutation()
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async createArticle(
    @AuthToken() token: Token,
    @Args("input") input: CreateArticle,
  ) {
    return this.articlesService.createArticle(input, token.id);
  }

  @Query()
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async updateArticle(
    @ArticleExt() article: Article,
    @Args("input") input: UpdateArticle,
  ) {
    return this.articlesService.updateArticle(input, article);
  }

  @Query()
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async moveArticle(@Args("input") input: MoveArticle) {
    return this.articlesService.moveArticle(input);
  }

  @Query()
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async deleteArticle(@Args("input") input: DeleteArticle) {
    return this.articlesService.deleteArticle(input);
  }

  //---------Folders-----------
  @Query()
  async getAllFolders(@Args("limit") limit: number) {
    return this.articlesService.getAllFolders(limit);
  }

  @Query()
  async getFolderById(@Args("id") id: number) {
    const folder = await this.articlesService.getFolderById(id);
    if (!folder) {
      throw new FolderByIdNotFound(id);
    }
    return folder;
  }

  @Query()
  async getFoldersByName(@Args("name") name: string) {
    const folders = await this.articlesService.getFoldersByName(name);
    if (folders.length == 0) {
      throw new FoldersByNameNotFound(name);
    }
    return folders;
  }

  //--------------Use both children handlers to get all data about childrens
  @Query()
  async getChildrenFolders(@Args("id") id: number) {
    const folders = await this.articlesService.getChildrenFolders(id);
    return folders;
  }

  @Query()
  async getChildrenArticles(@Args("id") id: number) {
    const articles = await this.articlesService.getChildrenArticles(id);
    return articles;
  }
  //----------------------------------

  @Query()
  @UseGuards(JwtAuthGuard)
  async getFavouriteFolders(@AuthToken() token: Token) {
    const folders = await this.articlesService.getFavouriteFolders(token.id);
    if (folders.length == 0) {
      throw new FavouriteFoldersNotFound();
    }
    return folders;
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async getMyFolders(@AuthToken() token: Token) {
    const folders = await this.articlesService.getMyFolders(token.id);
    if (folders.length == 0) {
      throw new FolderNotFound();
    }
    return folders;
  }

	@Mutation()
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async createFolder(
    @AuthToken() token: Token,
    @Args("input") input: CreateFolder,
  ) {
    return this.articlesService.createFolder(input, token.id);
  }

	@Mutation()
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async updateFolder(
    @Args("input") input: UpdateFolder,
  ) {
    return this.articlesService.updateFolder(input);
  }

	@Mutation()
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async moveFolder(
    @Args("input") input: MoveFolder,
  ) {
    return this.articlesService.moveFolder(input);
  }

	@Mutation()
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async deleteFolder(
    @Args("input") input: DeleteFolder,
  ) {
    return this.articlesService.deleteFolder(input);
  }
}
