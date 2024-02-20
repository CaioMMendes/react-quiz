"use client";
import ErrorComponent from "@/components/error-component";
import Question from "@/components/question";
import StartQuiz from "@/components/start-quiz";
import fetchData from "@/fetch/fetch-data";
import { useEffect, useReducer } from "react";
import Loading from "./loading";
import Button from "@/components/button";
import Progress from "@/components/progress";
import questionPoints from "@/utils/question-points";

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
  | { type: "nextQuestion" }
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
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
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
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numberOfQuestions = questions.length;
  const { totalPoints } = questionPoints(questions);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleNextQuestionClick = () => {
    dispatch({ type: "nextQuestion" });
  };

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
        <div className="flex flex-col gap-5 p-5 justify-center items-end w-fit bg-primary-2 rounded-lg overflow-hidden">
          <Progress
            numberOfQuestions={numberOfQuestions}
            index={index}
            points={points}
            totalPoints={totalPoints}
            answer={answer}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />

          <Button
            variant="button"
            disabled={answer === null}
            className={`hover:bg-primary-1/50 bg-primary-1 ${
              answer === null && "opacity-0"
            } `}
            onClick={handleNextQuestionClick}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
