import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
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
} from "./guard/allowance.guard";
import { ArticleExt, FolderExt } from "./decorator";

import { JwtAuthGuard } from "../auth/guard/jwtAuth.guard";
import { AuthToken } from "../auth/decorator/authToken.decorator";

import { Article, Folder } from "src/entities";
import { Token } from "../auth/types";

import {
  CreateArticleDto,
  CreateFolderDto,
  DeleteArticleDto,
  DeleteFolderDto,
  MoveArticleDto,
  MoveFolderDto,
  UpdateArticleDto,
  UpdateFolderDto,
} from "./dto";
import {
  FavouriteFoldersNotFound,
  FolderNotFound,
  FoldersByNameNotFound,
} from "./exception/notFound";

@Resolver("Article")
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  //-----------Articles-------------
  @Query((returns) => [Article])
  async getAllArticles(
    @Args("limit", { type: () => Int, nullable: true }) limit: number,
  ) {
    return this.articlesService.getAllArticles(limit);
  }

  @Query((returns) => Article, { nullable: true })
  async getArticleById(@Args("id", { type: () => Int }) id: number) {
    const article = await this.articlesService.getArticleById(id);
    if (!article) {
      throw new ArticleByIdNotFound(id);
    }
    return article;
  }

  @Query((returns) => [Article], { nullable: true })
  async getArticlesByTitle(
    @Args("title", { type: () => String }) title: string,
  ) {
    const articles = await this.articlesService.getArticlesByTitle(title);
    if (articles.length == 0) {
      throw new ArticleByTitleNotFound(title);
    }
    return articles;
  }

  @Query((returns) => [Article], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getFavouriteArticles(@AuthToken() token: Token) {
    const articles = await this.articlesService.getFavouriteArticles(token.id);
    if (articles.length == 0) {
      throw new FavouriteArticlesNotFound();
    }
    return articles;
  }

  @Query((returns) => [Article], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getMyArticles(@AuthToken() token: Token) {
    const articles = await this.articlesService.getMyArticles(token.id);
    if (articles.length == 0) {
      throw new ArticleNotFound();
    }
    return articles;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(JwtAuthGuard)
  async toggleFavouriteArticle(
    @AuthToken() token: Token,
    @Args("id", { type: () => Int }) id: number,
  ) {
    const article = await this.getArticleById(id);
    if (!article) {
      throw new ArticleByIdNotFound(id);
    } else {
      return this.articlesService.toggleFavouriteArticle(article, id, token.id);
    }
  }

  @Mutation((returns) => Article)
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async createArticle(
    @AuthToken() token: Token,
    @Args("input") input: CreateArticleDto,
  ) {
    return this.articlesService.createArticle(input, token.id);
  }

  @Mutation((returns) => Article, { nullable: true })
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async updateArticle(
    @ArticleExt() article: Article,
    @Args("input") input: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(input, article);
  }

  @Mutation((returns) => Article, { nullable: true })
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async moveArticle(@Args("input") input: MoveArticleDto) {
    return this.articlesService.moveArticle(input);
  }

  @Mutation((returns) => Article, { nullable: true })
  @UseGuards(JwtAuthGuard, ArticleAllowanceGuard)
  async deleteArticle(@Args("input") input: DeleteArticleDto) {
    return this.articlesService.deleteArticle(input);
  }

  //---------Folders----------
  @Mutation((returns) => Folder)
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async createFolder(
    @AuthToken() token: Token,
    @Args("input") input: CreateFolderDto,
  ) {
    return this.articlesService.createFolder(input, token.id);
  }

  @Query((returns) => [Folder])
  async getAllFolders(
    @Args("limit", { type: () => Int, nullable: true }) limit: number,
  ) {
    return this.articlesService.getAllFolders(limit);
  }

  @Query((returns) => Folder, { nullable: true })
  async getFolderById(@Args("id") id: number) {
    const folder = await this.articlesService.getFolderById(id);
    if (!folder) {
      throw new FolderByIdNotFound(id);
    }
    return folder;
  }

  @Query((returns) => [Folder], { nullable: true })
  async getFoldersByName(@Args("name", { type: () => String }) name: string) {
    const folders = await this.articlesService.getFoldersByName(name);
    if (folders.length == 0) {
      throw new FoldersByNameNotFound(name);
    }
    return folders;
  }

  //--------------Use both children handlers to get all data about childrens
  @Query((returns) => [Folder], { nullable: true })
  async getChildrenFolders(@Args("id", { type: () => Int }) id: number) {
    const folders = await this.articlesService.getChildrenFolders(id);
    return folders;
  }

  @Query((returns) => [Article], { nullable: true })
  async getChildrenArticles(@Args("id", { type: () => Int }) id: number) {
    const articles = await this.articlesService.getChildrenArticles(id);
    return articles;
  }
  //----------------------------------

  @Query((returns) => [Folder], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getFavouriteFolders(@AuthToken() token: Token) {
    const folders = await this.articlesService.getFavouriteFolders(token.id);
    if (folders.length == 0) {
      throw new FavouriteFoldersNotFound();
    }
    return folders;
  }

  @Query((returns) => [Folder], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getMyFolders(@AuthToken() token: Token) {
    const folders = await this.articlesService.getMyFolders(token.id);
    if (folders.length == 0) {
      throw new FolderNotFound();
    }
    return folders;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(JwtAuthGuard)
  async toggleFavouriteFolder(
    @AuthToken() token: Token,
    @Args("id", { type: () => Int }) id: number,
  ) {
    const folder = await this.getFolderById(id);
    if (!folder) {
      throw new FolderByIdNotFound(id);
    } else {
      return this.articlesService.toggleFavouriteFolder(folder, id, token.id);
    }
  }

  @Mutation((returns) => Folder, { nullable: true })
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async updateFolder(
    @FolderExt() folder: Folder,
    @Args("input") input: UpdateFolderDto,
  ) {
    return this.articlesService.updateFolder(input, folder);
  }

  @Mutation((returns) => Folder, { nullable: true })
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async moveFolder(@Args("input") input: MoveFolderDto) {
    return this.articlesService.moveFolder(input);
  }

  @Mutation((returns) => Folder, { nullable: true })
  @UseGuards(JwtAuthGuard, FolderAllowanceGuard)
  async deleteFolder(@Args("input") input: DeleteFolderDto) {
    return this.articlesService.deleteFolder(input);
  }
}
