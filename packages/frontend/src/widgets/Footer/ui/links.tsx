import { LinkUI } from "shared/ui/Link";
import { links_columns, links_title } from "./footer.module.scss";
import { LinksItemsI } from "shared/config/routers";

interface LinksColumProps {
  title: string;
  links: LinksItemsI[];
}

export const LinksColum = ({ title, links }: LinksColumProps) => {
  return (
    <div className={links_columns}>
      <h4 className={links_title}>{title}</h4>
      <ul className={links_columns}>
        {links.map((link: LinksItemsI) => (
          <li key={link.title}>
            <LinkUI to={link.to}>Home</LinkUI>
          </li>
        ))}
      </ul>
    </div>
  );
};
