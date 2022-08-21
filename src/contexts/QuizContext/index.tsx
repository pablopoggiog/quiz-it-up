import {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useCallback
} from "react";
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
  const [questions, setQuestion] = useState<Question[]>(mockedQuiz.questions);
  const currentQuestionIndex = answers.length;

  const startQuiz = () => setQuizStarted(true);

  const currentQuestion = questions[currentQuestionIndex];

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
