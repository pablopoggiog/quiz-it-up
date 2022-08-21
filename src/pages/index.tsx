import type { NextPage } from "next";
import Head from "next/head";
import { useWeb3, useQuiz } from "src/hooks";
import { Question, Overview } from "@components";
import { mockedQuiz } from "@utils";

const Home: NextPage = () => {
  const { currentQuestion, quizStarted, startQuiz } = useQuiz();
  const {
    currentAccount,
    isRopsten,
    quizBalance,
    connectWallet,
    switchNetwork
  } = useWeb3();

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
            <>
              <h2>{mockedQuiz.title}</h2>
              {quizStarted ? (
                currentQuestion ? (
                  <Question question={currentQuestion} />
                ) : (
                  <Overview />
                )
              ) : (
                <button onClick={startQuiz}>Start</button>
              )}
            </>
          )}
        </>
      ) : (
        <button onClick={connectWallet}>connect</button>
      )}
    </div>
  );
};

export default Home;
