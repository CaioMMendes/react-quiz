"use client";
import { ChangeEvent, useReducer, useState } from "react";
import Button from "./button";
import Input from "./input";

function DateCounter() {
  //   const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decrease" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "increase" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "set", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "set", payload: 0 });
    setStep(1);
  };

  return (
    <div className="w-full flex flex-col gap-2 justify-center">
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
  | { type: "set"; payload: number };

function reducer(state: number, action: ActionType) {
  if (action.type === "increase") return state + 1;
  if (action.type === "decrease") return state - 1;
  if (action.type === "set") return action.payload;

  return state;
}
