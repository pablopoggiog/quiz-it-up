import type { NextPage } from "next";
import { useContext } from "react";
import { Web3Context } from "src/contexts";
import Head from "next/head";

const Home: NextPage = () => {
  const {
    currentAccount,
    isRopsten,
    quizBalance,
    connectWallet,
    switchNetwork
  } = useContext(Web3Context);

  return (
    <div>
      <Head>
        <title>Quiz it up</title>
        <meta
          name="description"
          content="The app where you can earn token rewards just answering surveys!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {currentAccount ? (
        <>
          <p>QUIZ: {quizBalance}</p>
          {!isRopsten ? (
            <button onClick={switchNetwork}>Switch to Ropsten</button>
          ) : (
            <button>Start</button>
          )}
        </>
      ) : (
        <button onClick={connectWallet}>connect</button>
      )}
    </div>
  );
};

export default Home;
