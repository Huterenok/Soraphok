import {
  navbar_wrapper,
  content_sticky,
  sidebar_container,
  menu_indedets,
} from "./lectures.module.scss";
import { ListLectures } from "./list";

export const NavbarLecturesCourse = () => {
  return (
    <aside className={navbar_wrapper}>
      <div className={content_sticky}>
        <div className={sidebar_container}>
          <nav className={menu_indedets}>
            <ListLectures />
          </nav>
        </div>
      </div>
    </aside>
  );
};
