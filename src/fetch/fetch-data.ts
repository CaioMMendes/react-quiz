"use server";

import { ActionType } from "@/app/page";

export default async function fetchData() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/questions`);
    const result = await data.json();

    if (result) {
      return { type: "dataReceived", payload: result } as ActionType;
    }
    return { type: "dataFailed" } as ActionType;
  } catch (error) {
    console.log(error);
    return { type: "dataFailed" } as ActionType;
  }
}
