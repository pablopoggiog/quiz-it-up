import { useQuiz } from "@hooks";

export const Overview = () => {
  const { questions, answers } = useQuiz();

  return (
    <div>
      <h3>Overview</h3>
      {answers.map((answer, index) => {
        return (
          <p key={index}>
            {questions[index].text}:{" "}
            {questions[index]?.options[answer as number]?.text ?? "no response"}
          </p>
        );
      })}
      <button>Submit</button>
    </div>
  );
};
