import { FunctionComponent, createContext, useState } from "react";
import { mockedQuiz } from "@utils";
import { Question } from "@types";

export const QuizContext = createContext({
  questions: [] as Question[],
  currentQuestion: {} as Question,
  answers: [] as (number | null)[],
  addNewAnswer: (_: number | null) => {},
  quizStarted: false,
  startQuiz: () => {}
});

export const QuizContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  // the only reason to hace a useState for this is to simulate that we just fetched it
  const [questions] = useState<Question[]>(mockedQuiz.questions);

  const currentQuestionIndex = answers.length;
  const currentQuestion = questions[currentQuestionIndex];

  const startQuiz = () => setQuizStarted(true);
  const addNewAnswer = (answer: number | null) => {
    setAnswers([...answers, answer]);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        answers,
        addNewAnswer,
        quizStarted,
        startQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
