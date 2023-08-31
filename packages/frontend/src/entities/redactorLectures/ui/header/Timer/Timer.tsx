import { TimerUI } from "shared/ui/Timer";
import {
  timerBody,
  timerText,
  timerTextSpoiler,
  timerToogle,
} from "./Timer.module.scss";
import spoiler from "shared/assets/spoiler.png";
import Image from "next/image";
import Countdown from "react-countdown";
import { useState } from "react";

export const TimerHeader = () => {
  const [isRuning, setIsRunning] = useState(false);

  return (
    <div className={timerBody}>
      <button className={timerToogle} onClick={() => setIsRunning(!isRuning)}>
        {isRuning ? "Stop" : "Start"} timer
      </button>

      <div
        className={timerText}
        style={{
          display: isRuning ? "flex" : "none",
        }}
      >
        <Image src={spoiler} className={timerTextSpoiler} alt="spoiler" />
        <Countdown date={Date.now() + 100_000} renderer={TimerUI} />
      </div>
    </div>
  );
};
