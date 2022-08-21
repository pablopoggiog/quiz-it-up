import { useQuiz } from "@hooks";

export const Overview = () => {
  const { questions, answers } = useQuiz();

  return (
    <div>
      Overview
      {answers.map((answer, index) => {
        return (
          <p key={index}>
            {questions[index].text}:{" "}
            {answer ? questions[index]?.options[answer]?.text : "no response"}
          </p>
        );
      })}
      <button>Submit</button>
    </div>
  );
};
