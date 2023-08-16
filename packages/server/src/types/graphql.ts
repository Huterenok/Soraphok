
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

export interface UpdateUser {
    bio?: Nullable<string>;
    avatar?: Nullable<string>;
}

export interface Token {
    id: number;
    iat: number;
    exp: number;
}

export interface AuthPayload {
    token?: Nullable<string>;
}

export interface IMutation {
    loginUser(input?: Nullable<LoginUser>): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    registerUser(input?: Nullable<RegisterUser>): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    createUser(input?: Nullable<CreateUser>): Nullable<User> | Promise<Nullable<User>>;
    updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;
    becomeTeacher(): Nullable<User> | Promise<Nullable<User>>;
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
    getUserById(id: number): Nullable<User> | Promise<Nullable<User>>;
    getAllUsers(limit?: Nullable<number>): User[] | Promise<User[]>;
    getUserByUsername(username: string): Nullable<User> | Promise<Nullable<User>>;
    whoami(): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
