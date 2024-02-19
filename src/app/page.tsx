"use client";
import { Suspense, useEffect, useReducer } from "react";
import Loading from "./loading";
import Error from "./error";
import ErrorComponent from "@/components/error-component";
import Button from "@/components/button";
import StartQuiz from "@/components/start-quiz";
import Question from "@/components/question";
import fetchData from "@/fetch/fetch-data";

export interface QuestionTypes {
  options: string[];
  correctOption: number;
  points: number;
  question: string;
}

interface StateType {
  questions: QuestionTypes[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
}

export type ActionType =
  | { type: "dataReceived"; payload: QuestionTypes[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" };

const initialState: StateType = {
  questions: [],
  status: "loading",
  index: 0,
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
    case "startQuiz":
      return {
        ...state,
        status: "active",
      };
    default:
      return { ...state };
  }
}

export default function Home() {
  const [{ status, questions, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numberOfQuestions = questions.length;

  useEffect(() => {
    handleFetchData();
  }, []);

  async function handleFetchData() {
    const data = await fetchData();

    if (data) {
      dispatch(data);
    }
    if (data.type === "dataFailed") {
      alert("ocorreu um erro na requisição");
    }
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") return <ErrorComponent />;

  return (
    <>
      {status === "ready" && (
        <StartQuiz numberOfQuestions={numberOfQuestions} dispatch={dispatch} />
      )}
      {status === "active" && <Question question={questions[index]} />}
    </>
  );
}
