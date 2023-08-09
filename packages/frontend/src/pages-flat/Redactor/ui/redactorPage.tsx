import {
  NavbarLecturesCourse,
  NavbarTopicsCourse,
} from "features/NavbarsCourse";
import {
  bodyContent,
  WrapperContent,
  MainDoc,
  containerRow,
  containerRedactor,
} from "./redactorPage.module.scss";

import { RedactorWrapper } from "widgets/RedactorWrapper";

export function Redactor() {
  return (
    <div className={bodyContent}>
      <div className={WrapperContent}>
        {/* <NavbarLecturesCourse /> */}
        <main className={MainDoc}>
          <div className={containerRow}>
            <div className={containerRedactor}>
              <RedactorWrapper />
            </div>

            <NavbarTopicsCourse />
          </div>
        </main>
      </div>
    </div>
  );
}
