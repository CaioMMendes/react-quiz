"use client";
import ErrorComponent from "@/components/error-component";
import Question from "@/components/question";
import StartQuiz from "@/components/start-quiz";
import fetchData from "@/fetch/fetch-data";
import { useEffect, useReducer } from "react";
import Loading from "./loading";

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
  answer: number | null;
  points: number;
}

export type ActionType =
  | { type: "dataReceived"; payload: QuestionTypes[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" }
  | { type: "newAnswer"; payload: number };

const initialState: StateType = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      return { ...state };
  }
}

export default function Home() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
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
      {status === "active" && (
        <Question
          question={questions[index]}
          dispatch={dispatch}
          answer={answer}
        />
      )}
    </>
  );
}
