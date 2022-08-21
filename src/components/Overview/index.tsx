import { useContext } from "react";
import { QuizContext } from "@contexts";

export const Overview = () => {
  const { questions, answers } = useContext(QuizContext);

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
