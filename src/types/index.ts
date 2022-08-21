import { mockedQuiz } from "@utils";
import { ethers } from "ethers";

interface Ethereum extends ethers.providers.ExternalProvider {
  on: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}

export type Question = typeof mockedQuiz.questions[0];
