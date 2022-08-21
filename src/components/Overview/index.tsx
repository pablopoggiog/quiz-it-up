import { useQuiz } from "@hooks";

export const Overview = () => {
  const { questions, answers, submitQuestions } = useQuiz();

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
      <button onClick={submitQuestions}>Submit</button>
    </div>
  );
};
