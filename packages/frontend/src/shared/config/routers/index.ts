export enum ROUTERS_ALL {
  HOME = "/",
  REDACTOR = "/redactor",
  PROFILE = "/profile",
}

export interface LinksItemsI {
  title: string;
  to: ROUTERS_ALL;
}
