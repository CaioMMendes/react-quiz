import { ActionType } from "@/app/page";
import { Dispatch, useEffect } from "react";

interface TimerProps {
  secondsRemaining: number;
  dispatch: Dispatch<ActionType>;
}

const Timer = ({ dispatch, secondsRemaining }: TimerProps) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => dispatch({ type: "tick" }), 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="text-zinc-400">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
