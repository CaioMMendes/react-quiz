"use client";
import { ChangeEvent, useReducer, useState } from "react";
import Button from "./button";
import Input from "./input";

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
  });
  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count * step);

  const dec = function () {
    dispatch({ type: "decrease" });
  };

  const inc = function () {
    dispatch({ type: "increase" });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "set", payload: Number(e.target.value) });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <Input
          type="range"
          className="accent-primary-2/50"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div className="flex justify-center gap-2 items-center">
        <Button variant="button" onClick={dec} className="leading-none h-full">
          -
        </Button>
        <Input
          value={count === 0 ? "" : count}
          type="number"
          onChange={defineCount}
          className="h-full rounded-md flex bg-primary-2 px-2"
        />
        <Button variant="button" onClick={inc} className="leading-none h-full">
          +
        </Button>
      </div>

      <p className="flex justify-center">{date.toDateString()}</p>

      <div className="flex justify-center">
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

type ActionType =
  | { type: "increase" }
  | { type: "decrease" }
  | { type: "reset" }
  | { type: "setStep"; payload: number }
  | { type: "set"; payload: number };

function reducer(state: { count: number; step: number }, action: ActionType) {
  // if (action.type === "increase") return state + 1;
  // if (action.type === "decrease") return state - 1;
  // if (action.type === "set") return action.payload;

  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    case "decrease":
      return { ...state, count: state.count - 1 };
    case "set":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { count: 0, step: 1 };

    default:
      throw new Error("Unknown action");
  }
}
