import { FunctionComponent, createContext, useState } from "react";
import { useWeb3 } from "src/hooks";
import { mockedQuiz } from "@utils";
import { Question } from "@types";

export const QuizContext = createContext({
  questions: [] as Question[],
  currentQuestion: {} as Question,
  answers: [] as number[],
  addNewAnswer: (_: number) => {},
  quizStarted: false,
  startQuiz: () => {},
  submitQuestions: () => {}
});

export const QuizContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [surveyId, setSurveyId] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<number[]>([]);
  // the only reason to hace a useState for this is to simulate that we just fetched it
  const [questions] = useState<Question[]>(mockedQuiz.questions);

  const { submitQuizToContract } = useWeb3();

  const currentQuestionIndex = answers.length;
  const currentQuestion = questions[currentQuestionIndex];

  const startQuiz = () => setQuizStarted(true);
  const addNewAnswer = (answer: number) => {
    setAnswers([...answers, answer]);
  };
  const submitQuestions = () => {
    try {
      submitQuizToContract(surveyId, answers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
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
