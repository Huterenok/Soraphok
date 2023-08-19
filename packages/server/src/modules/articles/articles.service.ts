import { Injectable } from "@nestjs/common";

import { DatabaseService } from "src/config/database/database.service";

import {
  Article,
  CreateArticle,
  CreateFolder,
  DeleteArticle,
  DeleteFolder,
  MoveArticle,
  MoveFolder,
  UpdateArticle,
  UpdateFolder,
} from "src/types/graphql";

@Injectable()
export class ArticlesService {
  constructor(private readonly database: DatabaseService) {}

  //-------Articles---------
  async createArticle(data: CreateArticle, userId: number) {
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
          every: {
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

  //TODO
  async updateArticle(data: UpdateArticle, articleExt: Article) {
    const article = this.database.article.update({
      where: {
        id: data.id,
      },
      //TODO
      data: {
        content: data.content || articleExt?.content,
        title: data.title || articleExt?.title,
      },
    });
    return article;
  }

  async moveArticle(data: MoveArticle) {
    const article = this.database.article.update({
      where: {
        id: data.id,
      },
      //TODO
      data: {
        folderId: data.folderId,
      },
    });
    return article;
  }

  async deleteArticle(data: DeleteArticle) {
    const article = this.database.article.delete({
      where: {
        id: data.id,
      },
    });
    return article;
  }

  //-------Folders---------
  async createFolder(data: CreateFolder, userId: number) {
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

  //TODO
  async getFavouriteFolders(userId: number) {
    const folders = this.database.folder.findMany({
      where: {
        users: {
          every: {
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
        parentId: id,
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

  async updateFolder(data: UpdateFolder) {
    const folderById = await this.database.folder.findFirst({
      where: {
        id: data.id,
      },
    });
    const folder = this.database.folder.update({
      where: {
        id: data.id,
      },
      //TODO
      data: {
        name: data.name || folderById?.name,
        description: data.description || folderById?.description,
      },
    });
    return folder;
  }

  async moveFolder(data: MoveFolder) {
    const folder = this.database.folder.update({
      where: {
        id: data.id,
      },
      //TODO
      data: {
        parentId: data.folderId,
      },
    });
    return folder;
  }

  async deleteFolder(data: DeleteFolder) {
    const folder = this.database.folder.delete({
      where: {
        id: data.id
      },
    });
    return folder;
  }
}
