import { LinkUI } from "shared/ui/Link";
import { navBar_column, navBar_list, navBar_stiky } from "./topics.module.scss";
import { ROUTERS_ALL } from "shared/config/routers";

export const NavbarTopicsCourse = () => {
  return (
    <div className={navBar_column}>
      <div className={navBar_stiky}>
        <ul className={navBar_list}>
          <li>
            <LinkUI to={ROUTERS_ALL.REDACTOR}>
              Create your first React Page
            </LinkUI>
          </li>

          <li>
            <LinkUI to={ROUTERS_ALL.HOME}>
              Create your first Markdown Page
            </LinkUI>
          </li>
        </ul>
      </div>
    </div>
  );
};
