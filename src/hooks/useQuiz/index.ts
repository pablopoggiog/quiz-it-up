import { useContext } from "react";
import { QuizContext } from "src/contexts";

export const useQuiz = () => {
  const context = useContext(QuizContext);
  return context;
};
