import { Dispatch } from "react";
import Button from "./button";
import { ActionType } from "@/app/page";
import { motion } from "framer-motion";

interface FinishScreenProps {
  points: number;
  totalPoints: number;
  highscore: number;
  dispatch: Dispatch<ActionType>;
}

const FinishScreen = ({
  points,
  totalPoints,
  highscore,
  dispatch,
}: FinishScreenProps) => {
  const percentage = Math.ceil((points / totalPoints) * 100);

  const handleRestartClick = () => {
    dispatch({ type: "restart" });
  };

  return (
    <motion.div
      className="flex flex-col gap-3 justify-center items-center"
      initial={{ opacity: 0, y: 0, scale: 0 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, y: 0, scale: 0, transition: { duration: 0.5 } }}
    >
      <div className="flex items-center justify-center  bg-primary-2 p-5 rounded-lg">
        <p>
          You scored <strong>{points}</strong> out of {totalPoints} (
          {percentage}
          %)
        </p>
      </div>
      <p>(Highscore: {highscore} points)</p>
      <Button
        variant="button"
        className="bg-primary-2 hover:bg-primary-2/50 px-5"
        onClick={handleRestartClick}
      >
        Go to initial page
      </Button>
    </motion.div>
  );
};

export default FinishScreen;
