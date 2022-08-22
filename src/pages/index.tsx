import type { NextPage } from "next";
import Head from "next/head";
import { VStack, Text, Button, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useWeb3, useQuiz } from "src/hooks";
import { Question, Overview } from "@components";

const gradientAnimation = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const backgroundProps = {
  bgColor: "app.bg",
  bgImage: "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
  animation: `${gradientAnimation} 10s ease infinite`,
  bgSize: "150% 150%"
};

const Home: NextPage = () => {
  const { quiz, currentQuestion, quizStarted, startQuiz } = useQuiz();
  const {
    currentAccount,
    isRopsten,
    quizBalance,
    connectWallet,
    switchNetwork
  } = useWeb3();

  return (
    <>
      <Head>
        <title>Quiz it up</title>
        <meta
          name="description"
          content="The app where you can earn token rewards just answering surveys!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack p={4} gap={20} minH="100vh" {...backgroundProps} color="white">
        {!currentAccount ? (
          <Button onClick={connectWallet}>Connect wallet</Button>
        ) : (
          <>
            <Text
              p={2}
              bg="whiteAlpha.200"
              alignSelf="flex-start"
              rounded="lg"
              fontWeight="bold"
            >
              QUIZ: {quizBalance}
            </Text>

            {!isRopsten ? (
              <Button onClick={switchNetwork}>Switch to Ropsten</Button>
            ) : (
              <VStack h="full" w="full" justify="space-between" gap={10}>
                <Text as="h1" fontSize="3xl" fontWeight="bold">
                  {quiz.title}
                </Text>
                <Image
                  src={quiz.image}
                  alt="Trivia image"
                  maxW={[120, 200]}
                  rounded="lg"
                />

                {!quizStarted ? (
                  <Button onClick={startQuiz}>Start</Button>
                ) : currentQuestion ? (
                  <Question question={currentQuestion} />
                ) : (
                  <Overview />
                )}
              </VStack>
            )}
          </>
        )}
      </VStack>
    </>
  );
};

export default Home;
