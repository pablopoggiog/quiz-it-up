import { FunctionComponent, createContext, useState } from "react";
import { useWeb3 } from "@hooks";
import { mockedQuiz } from "@utils";
import { Quiz, Question, SubmitQuizReturn } from "@types";

export const QuizContext = createContext({
  quiz: {} as Quiz,
  currentQuestion: {} as Question,
  answers: [] as number[],
  addNewAnswer: (_: number) => {},
  quizStarted: false,
  startQuiz: () => {},
  submitQuestions: () => ({} as SubmitQuizReturn)
});

export const QuizContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [surveyId, setSurveyId] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<number[]>([]);
  // the only reason to hace a useState for this is to simulate that we just fetched it
  const [quiz] = useState<Quiz>(mockedQuiz);

  const { submitQuizToContract } = useWeb3();

  const currentQuestionIndex = answers.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const startQuiz = () => setQuizStarted(true);
  const addNewAnswer = (answer: number) => {
    setAnswers([...answers, answer]);
  };
  const submitQuestions = () => {
    const result = submitQuizToContract(surveyId, answers);
    return result;
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        currentQuestion,
        answers,
        addNewAnswer,
        quizStarted,
        startQuiz,
        submitQuestions
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
