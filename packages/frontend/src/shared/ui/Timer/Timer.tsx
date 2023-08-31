interface TimerRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const formatTime = (time: number): string | number =>
  time < 10 ? `0${time}` : time;

export const TimerUI = ({ hours, minutes, seconds }: TimerRender) => {
  return (
    <span>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </span>
  );
};
