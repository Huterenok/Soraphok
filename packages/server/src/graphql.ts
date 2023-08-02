
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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

export interface Token {
    token: string;
}

export interface IMutation {
    loginUser(input?: Nullable<LoginUser>): Nullable<Token> | Promise<Nullable<Token>>;
    registerUser(input?: Nullable<RegisterUser>): Nullable<Token> | Promise<Nullable<Token>>;
    createUser(input?: Nullable<CreateUser>): Nullable<User> | Promise<Nullable<User>>;
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

export interface IQuery {
    getAllUsers(): User[] | Promise<User[]>;
    getUserByEmail(email: string): Nullable<User> | Promise<Nullable<User>>;
    getUserByUsername(username: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
