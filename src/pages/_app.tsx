import type { AppProps } from "next/app";
import { Web3ContextProvider, QuizContextProvider } from "@contexts";

const App = ({ Component, pageProps }: AppProps) => (
  <Web3ContextProvider>
    <QuizContextProvider>
      <Component {...pageProps} />
    </QuizContextProvider>
  </Web3ContextProvider>
);

export default App;
