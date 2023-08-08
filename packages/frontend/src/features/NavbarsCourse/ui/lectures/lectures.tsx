import { LinkUI } from "shared/ui/Link";
import {
  navbar_wrapper,
  content_sticky,
  sidebar_container,
  menu_indedets,
  content_list,
} from "./lectures.module.scss";
import { ROUTERS_ALL } from "shared/config/routers";

export const NavbarLecturesCourse = () => {
  return (
    <aside className={navbar_wrapper}>
      <div className={content_sticky}>
        <div className={sidebar_container}>
          <nav className={menu_indedets}>
            <ul className={content_list}>
              <li>
                <LinkUI to={ROUTERS_ALL.REDACTOR}>Getting Started</LinkUI>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};
