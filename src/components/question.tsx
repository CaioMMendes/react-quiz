"use client";
import { QuestionTypes } from "@/app/page";
import Button from "./button";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

interface QuestionProps {
  question: QuestionTypes;
}

const Question = ({ question }: QuestionProps) => {
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
              key={uuidv4()}
              className="w-full"
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.5 }}
              whileHover={{ x: 25 }}
              transition={{
                hover: { duration: 0.1 },
                delay: index * 0.1,
                duration: 0.3,
              }}
            >
              <Button variant="button" className="w-full truncate text-nowrap">
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
