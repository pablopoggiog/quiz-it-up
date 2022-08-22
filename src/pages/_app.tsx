import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ContextProvider, QuizContextProvider } from "@contexts";
import { theme } from "@theme";

const App = ({ Component, pageProps }: AppProps) => (
  <Web3ContextProvider>
    <QuizContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QuizContextProvider>
  </Web3ContextProvider>
);

export default App;
