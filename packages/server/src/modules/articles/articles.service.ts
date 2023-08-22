import { Injectable } from "@nestjs/common";

import { DatabaseService } from "src/config/database/database.service";

import { Article, Folder } from "src/entities";

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

@Injectable()
export class ArticlesService {
  constructor(private readonly database: DatabaseService) {}

  //-------Articles---------
  async createArticle(data: CreateArticleDto, userId: number) {
    const article = this.database.article.create({
      data: {
        ...data,
        authorId: userId,
      },
    });
    return article;
  }

  async getAllArticles(limit: number = 30) {
    const articles = await this.database.article.findMany({ take: limit });
    return articles;
  }

  async getArticleById(id: number) {
    const article = await this.database.article.findFirst({ where: { id } });
    return article;
  }

  async getArticlesByTitle(title: string) {
    const articles = await this.database.article.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
    return articles;
  }

  async getFavouriteArticles(userId: number) {
    const articles = await this.database.article.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    return articles;
  }

  async getMyArticles(userId: number) {
    const articles = await this.database.article.findMany({
      where: {
        authorId: userId,
      },
    });
    return articles;
  }

  async toggleFavouriteArticle(article: Article, id: number, userId: number) {
    const favouriteArticle = await this.database.article.findFirst({
      where: {
        id,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    const action = favouriteArticle ? "disconnect" : "connect";
		const changeLikeAmount = favouriteArticle ? article.likes - 1 : article.likes + 1;
    await this.database.article.update({
      where: {
        id,
      },
      data: {
        users: {
          [action]: {
            id: userId,
          },
        },
				likes: changeLikeAmount
      },
    });
    return !favouriteArticle;
  }

  async updateArticle(data: UpdateArticleDto, articleExt: Article) {
    const article = this.database.article.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content || articleExt?.content,
        title: data.title || articleExt?.title,
      },
    });
    return article;
  }

  async moveArticle(data: MoveArticleDto) {
    const article = this.database.article.update({
      where: {
        id: data.id,
      },
      data: {
        folderId: data.folderId,
      },
    });
    return article;
  }

  async deleteArticle(data: DeleteArticleDto) {
    const article = this.database.article.delete({
      where: {
        id: data.id,
      },
    });
    return article;
  }

  //-------Folders---------
  async createFolder(data: CreateFolderDto, userId: number) {
    const article = this.database.folder.create({
      data: {
        ...data,
        authorId: userId,
      },
    });
    return article;
  }

  async getAllFolders(limit: number = 10) {
    const folders = this.database.folder.findMany({
      take: limit,
    });
    return folders;
  }

  async getFolderById(id: number) {
    const folder = this.database.folder.findFirst({ where: { id } });
    return folder;
  }

  async getFoldersByName(name: string) {
    const folders = this.database.folder.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return folders;
  }


  async getFavouriteFolders(userId: number) {
    const folders = this.database.folder.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    return folders;
  }

  async getMyFolders(userId: number) {
    const folders = this.database.folder.findMany({
      where: {
        authorId: userId,
      },
    });
    return folders;
  }

  async getChildrenFolders(id: number) {
    const folders = this.database.folder.findMany({
      where: {
        folderId: id,
      },
    });
    return folders;
  }

  async getChildrenArticles(id: number) {
    const articles = this.database.article.findMany({
      where: {
        folderId: id,
      },
    });
    return articles;
  }

  async toggleFavouriteFolder(folder: Folder, id: number, userId: number) {
    const favouriteFolder = await this.database.folder.findFirst({
      where: {
        id,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    const action = favouriteFolder ? "disconnect" : "connect";
		const changeLikeAmount = favouriteFolder ? folder.likes - 1 : folder.likes + 1;
    await this.database.folder.update({
      where: {
        id,
      },
      data: {
        users: {
          [action]: {
            id: userId,
          },
        },
				likes: changeLikeAmount
      },
    });
    return !favouriteFolder;
  }

  async updateFolder(data: UpdateFolderDto, folderById: Folder) {
    const folder = this.database.folder.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name || folderById.name,
        description: data.description || folderById.description,
      },
    });
    return folder;
  }

  async moveFolder(data: MoveFolderDto) {
    const folder = this.database.folder.update({
      where: {
        id: data.id,
      },
      data: {
        folderId: data.folderId,
      },
    });
    return folder;
  }

  async deleteFolder(data: DeleteFolderDto) {
    const folder = this.database.folder.delete({
      where: {
        id: data.id,
      },
    });
    return folder;
  }
}
