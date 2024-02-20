"use client";
import { ActionType, QuestionTypes } from "@/app/page";
import Button from "./button";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Dispatch } from "react";

interface QuestionProps {
  question: QuestionTypes;
  dispatch: Dispatch<ActionType>;
  answer: number | null;
}

const Question = ({ question, dispatch, answer }: QuestionProps) => {
  const handleSelectAnswer = (index: number) => {
    dispatch({ type: "newAnswer", payload: index });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center flex-1 p-5 max-w-screen-sm mx-auto">
      <motion.h3
        className="font-semibold text-xl text-center "
        initial={{ opacity: 0, y: 0, scale: 0 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        {question.question}
      </motion.h3>

      <div className="flex flex-col gap-2 items-center justify-center w-full">
        {question.options.map((option, index) => {
          return (
            <motion.div
              key={`${index}${question.question}${option}`}
              className={`w-full `}
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={index === answer ? { x: 25 } : undefined}
              whileHover={answer === null ? { x: 25 } : undefined}
              transition={{
                hover: { duration: 0.1 },
                delay: index * 0.1,
                duration: 0.3,
              }}
            >
              <Button
                variant="button"
                disabled={answer !== null && true}
                className={`w-full truncate text-nowrap bg-primary-1 ${
                  answer !== null
                    ? ` pointer-events-none 
                    ${
                      index === question.correctOption
                        ? "bg-green-700"
                        : "bg-red-800"
                    }`
                    : "hover:bg-primary-1/50"
                }`}
                onClick={() => handleSelectAnswer(index)}
              >
                {option}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
