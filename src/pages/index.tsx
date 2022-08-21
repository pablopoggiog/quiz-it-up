import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { Web3Context, QuizContext } from "src/contexts";
import { Question, Overview } from "@components";
import { mockedQuiz } from "@utils";

const Home: NextPage = () => {
  const { currentQuestion, quizStarted, startQuiz } = useContext(QuizContext);
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
