import { headerLesson } from "./header.module.scss";
import { Popover as PopoverRoot } from "@radix-ui/react-popover";
import { TooltipFile } from "../components";
import { Cover } from "./Cover/Cover";
import { Avatar } from "./Avatar/Avatar";
import { Title } from "./Title/Title";
import { TimerHeader } from "./Timer/Timer";

export const HeaderLesson = () => {
  return (
    <PopoverRoot>
      <div className={headerLesson}>
        <Cover />

        <Avatar />
      </div>

      <Title />

			<TimerHeader />

      <TooltipFile />
    </PopoverRoot>
  );
};
