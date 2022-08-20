import type { AppProps } from "next/app";
import { Web3ContextProvider } from "src/contexts";

const App = ({ Component, pageProps }: AppProps) => (
  <Web3ContextProvider>
    <Component {...pageProps} />
  </Web3ContextProvider>
);

export default App;
