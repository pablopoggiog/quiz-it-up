import { mockedQuiz } from "@utils";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type Question = typeof mockedQuiz.questions[0];
