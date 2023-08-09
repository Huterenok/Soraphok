"use client";
import { LinkUI } from "shared/ui/Link";
import { navBar_column, navBar_list, navBar_stiky } from "./topics.module.scss";
import { useUnit } from "effector-react";
import { $topicsLectures } from "entities/redactorLectures";

export const NavbarTopicsCourse = () => {
  const topics = useUnit($topicsLectures);

  if (topics.length === 0) return null;
  return (
    <div className={navBar_column}>
      <div className={navBar_stiky}>
        <ul className={navBar_list}>
          {topics.map((topic: string) => (
            <li key={topic}>
              <LinkUI to={`#${topic}`}>{topic}</LinkUI>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
