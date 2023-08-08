import { LinksItemsI, ROUTERS_ALL } from "shared/config/routers";

export interface linksFooterI {
  MAIN: LinksItemsI[];
  PROFILE: LinksItemsI[];
  DOCS: LinksItemsI[];
}

export const linksFooter: linksFooterI = {
  MAIN: [
    {
      title: "Home",
      to: ROUTERS_ALL.HOME,
    },
  ],
  PROFILE: [
    {
      title: "PROFILE",
      to: ROUTERS_ALL.PROFILE,
    },
  ],
  DOCS: [],
};
