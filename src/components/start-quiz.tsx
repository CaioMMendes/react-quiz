import { Dispatch } from "react";
import Button from "./button";
import { ActionType } from "@/app/page";
import ReactIcon from "./icons/react-icon";
import { motion } from "framer-motion";

interface StartQuizProps {
  numberOfQuestions: number;
  dispatch: Dispatch<ActionType>;
}

const StartQuiz = ({ numberOfQuestions, dispatch }: StartQuizProps) => {
  const handleStartQuiz = () => {
    dispatch({ type: "startQuiz" });
  };

  return (
    <div className="flex flex-col gap-5 p-5 flex-1 items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 0, scale: 0 }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5 },
        }}
        exit={{ opacity: 0, y: 0, scale: 0, transition: { duration: 0.5 } }}
        animate={{
          rotateZ: 360,
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <ReactIcon className="size-36" color="#ffffff" />
      </motion.div>
      <motion.div
        className="flex flex-col gap-1 items-center justify-center text-center"
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 200, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-semibold text-2xl">Bem vindo ao React Quiz!</h2>
        <h3 className="text-xl font-medium">
          {numberOfQuestions} questões para testar suas habilidades em react
        </h3>
        <Button
          variant="button"
          className="hover:bg-primary-2/50"
          onClick={handleStartQuiz}
        >
          Começar
        </Button>
      </motion.div>
    </div>
  );
};

export default StartQuiz;
