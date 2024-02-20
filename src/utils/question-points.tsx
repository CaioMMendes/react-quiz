import { QuestionTypes } from "@/app/page";

export default function questionPoints(questions: QuestionTypes[]) {
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  return { totalPoints };
}
