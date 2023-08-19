
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateArticle {
    title: string;
    content: string;
    folderId: string;
}

export interface UpdateArticle {
    id: string;
    title?: Nullable<string>;
    content?: Nullable<string>;
}

export interface MoveArticle {
    id: string;
    folderId: string;
}

export interface DeleteArticle {
    id: string;
}

export interface CreateFolder {
    parentId?: Nullable<string>;
    name: string;
    description: string;
}

export interface UpdateFolder {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface MoveFolder {
    id: number;
    folderId: number;
}

export interface DeleteFolder {
    id: number;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    username: string;
}

export interface CreateUser {
    email: string;
    password: string;
    username: string;
    bio?: Nullable<string>;
    avatar?: Nullable<string>;
}

export interface UpdateUser {
    bio?: Nullable<string>;
    avatar?: Nullable<string>;
}

export interface Article {
    id: string;
    title: string;
    content: string;
    authorId: string;
    folderId: string;
}

export interface Folder {
    id: string;
    name: string;
    decription: string;
    authorId: string;
}

export interface IMutation {
    createArticle(input: CreateArticle): Nullable<Article> | Promise<Nullable<Article>>;
    updateArticle(input: UpdateArticle): Nullable<Article> | Promise<Nullable<Article>>;
    moveArticle(input: MoveArticle): Nullable<Article> | Promise<Nullable<Article>>;
    deleteArticle(input: DeleteArticle): Nullable<Article> | Promise<Nullable<Article>>;
    createFolder(input: CreateFolder): Nullable<Folder> | Promise<Nullable<Folder>>;
    updateFolder(input: UpdateFolder): Nullable<Folder> | Promise<Nullable<Folder>>;
    moveFolder(input: MoveFolder): Nullable<Folder> | Promise<Nullable<Folder>>;
    deleteFolder(input: DeleteFolder): Nullable<Folder> | Promise<Nullable<Folder>>;
    loginUser(input?: Nullable<LoginUser>): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    registerUser(input?: Nullable<RegisterUser>): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    createUser(input?: Nullable<CreateUser>): Nullable<User> | Promise<Nullable<User>>;
    updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;
    becomeTeacher(): Nullable<User> | Promise<Nullable<User>>;
}

export interface IQuery {
    getAllArticles(limit?: Nullable<number>): Nullable<Article>[] | Promise<Nullable<Article>[]>;
    getArticleById(id: number): Nullable<Article> | Promise<Nullable<Article>>;
    getArticlesByTitle(title: string): Nullable<Nullable<Article>[]> | Promise<Nullable<Nullable<Article>[]>>;
    getFavouriteArticles(): Nullable<Nullable<Article>[]> | Promise<Nullable<Nullable<Article>[]>>;
    getMyArticles(): Nullable<Nullable<Article>[]> | Promise<Nullable<Nullable<Article>[]>>;
    getAllFolders(limit?: Nullable<number>): Nullable<Folder>[] | Promise<Nullable<Folder>[]>;
    getFolderById(id: number): Nullable<Folder> | Promise<Nullable<Folder>>;
    getFoldersByName(name: string): Nullable<Nullable<Folder>[]> | Promise<Nullable<Nullable<Folder>[]>>;
    getFavouriteFolders(): Nullable<Nullable<Folder>[]> | Promise<Nullable<Nullable<Folder>[]>>;
    getMyFolders(): Nullable<Nullable<Article>[]> | Promise<Nullable<Nullable<Article>[]>>;
    getChildrenFolders(id: number): Nullable<Nullable<Folder>[]> | Promise<Nullable<Nullable<Folder>[]>>;
    getChildrenArticles(id: number): Nullable<Nullable<Article>[]> | Promise<Nullable<Nullable<Article>[]>>;
    getUserById(id: number): Nullable<User> | Promise<Nullable<User>>;
    getAllUsers(limit?: Nullable<number>): User[] | Promise<User[]>;
    getUserByUsername(username: string): Nullable<User> | Promise<Nullable<User>>;
    whoami(): Nullable<User> | Promise<Nullable<User>>;
}

export interface Token {
    id: number;
    iat: number;
    exp: number;
}

export interface AuthPayload {
    token?: Nullable<string>;
}

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    bio?: Nullable<string>;
    avatar?: Nullable<string>;
    role: string;
    isTeacher: boolean;
    isBanned: boolean;
    banReason?: Nullable<string>;
}

type Nullable<T> = T | null;
