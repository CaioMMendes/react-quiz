"use client";
import { useEffect, useReducer } from "react";

interface QuestionTypes {
  correctOption: number;
  options: Partial<{ numberProp: number; stringProp: string }>;
  points: number;
  question: string;
}

interface StateType {
  questions: QuestionTypes[];
  status: "loading" | "error" | "ready" | "active" | "finished";
}

type ActionType =
  | { type: "dataReceived"; payload: QuestionTypes[] }
  | { type: "dataFailed" };

const initialState: StateType = {
  questions: [],
  status: "loading",
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function Home() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/questions`);
      const result = await data.json();
      console.log(result);
      dispatch({ type: "dataReceived", payload: result });
      return result;
    } catch (error) {
      alert("ocorreu um erro na requisição");
      dispatch({ type: "dataFailed" });
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col gap-2 p-5">
      {questions.map((question: QuestionTypes) => {
        return <p key={question.question}>{question.question}</p>;
      })}
    </div>
  );
}
