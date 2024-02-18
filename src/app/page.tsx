"use client";
import { Suspense, useEffect, useReducer } from "react";
import Loading from "./loading";
import Error from "./error";
import ErrorComponent from "@/components/error-component";
import Button from "@/components/button";

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
      return { ...state };
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

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") return <ErrorComponent />;

  return (
    <div className="flex flex-col gap-5 p-5 flex-1 items-center justify-center">
      <h2 className="font-semibold text-2xl">Bem vindo ao React Quiz!</h2>
      <h3 className="text-xl font-medium">
        {questions.length} questões para testar suas habilidades em react
      </h3>
      <Button variant="button">Começar</Button>
    </div>
  );
}
