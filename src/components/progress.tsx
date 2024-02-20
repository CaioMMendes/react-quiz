interface ProgressProps {
  totalPoints: number;
  index: number;
  points: number;
  numberOfQuestions: number;
  answer: null | number;
}

const Progress = ({
  index,
  points,
  totalPoints,
  numberOfQuestions,
  answer,
}: ProgressProps) => {
  return (
    <header className="flex flex-col gap-1.5 w-full">
      {/* <progress
        className="flex w-full custom-progress"
        max={numberOfQuestions}
        value={index}
      /> */}

      <div className="w-full  rounded-full h-2.5 bg-zinc-600">
        <div
          className={`bg-primary-1 h-2.5 rounded-full `}
          style={{
            width: `${
              ((index + Number(answer !== null)) / numberOfQuestions) * 100
            }%`,
          }}
        ></div>
      </div>

      <div className="flex w-full justify-between items-center ">
        <p>
          Question <strong>{index + 1}</strong>/{numberOfQuestions}
        </p>
        <p>
          <strong>{points}</strong>/{totalPoints}
        </p>
      </div>
    </header>
  );
};

export default Progress;
