import { linksFooter } from "../config";
import {
  content_copyright,
  content_row,
  footer,
  footer_container,
} from "./footer.module.scss";
import { LinksColum } from "./links";

export const Footer = () => {
  return (
    <footer className={footer}>
      <div className={footer_container}>
        <div className={content_row}>
          <LinksColum title="Main" links={linksFooter.MAIN} />
          <LinksColum title="Profile" links={linksFooter.PROFILE} />
          <LinksColum title="Docs" links={linksFooter.DOCS} />
        </div>
        <div className={content_copyright}>
          Copyright © 2023 SoRaphOk, Inc Soraphok.
        </div>
      </div>
    </footer>
  );
};
