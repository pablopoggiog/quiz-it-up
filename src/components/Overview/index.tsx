import { useState } from "react";
import { Flex, Text, Button, VStack } from "@chakra-ui/react";
import { TransactionModal } from "@components";
import { useQuiz } from "@hooks";

export const Overview = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { quiz, answers, submitQuestions } = useQuiz();

  const submit = async () => {
    setModalIsOpen(true);

    const response = await submitQuestions();
    if (response) {
      const [transactionHash, error] = response;
      if (transactionHash) {
        setTransactionHash(transactionHash);
      } else {
        const errorMessage = (error as string).includes(
          "execution reverted: Cooldown period not finished"
        )
          ? "You can only submit one survey every 24hs"
          : (error as string).includes("user rejected transaction")
          ? "User rejected transaction"
          : error;

        setErrorMessage(errorMessage as string);
      }
    }
  };

  const onClose = () => {
    setModalIsOpen(false);
    setTransactionHash("");
    setErrorMessage("");
  };

  return (
    <VStack
      p={10}
      gap={[5, 10]}
      shadow="dark-lg"
      rounded="lg"
      fontWeight="bold"
      w={["full", "fit-content"]}
      minW="40%"
      bgColor="card.bg"
    >
      <Text as="h3">Overview</Text>

      <VStack w="full" gap={5} px={4}>
        {answers.map((answer, index) => (
          <Flex
            key={index}
            w="full"
            justify="space-between"
            gap={4}
            rounded="lg"
            bgColor="card.bg"
            p={4}
          >
            <Text>{quiz.questions[index].text}:</Text>
            <Text>
              {quiz.questions[index]?.options[answer as number]?.text ??
                "no response"}
            </Text>
          </Flex>
        ))}
      </VStack>
      <Button bgColor="whiteAlpha.200" onClick={submit}>
        Submit
      </Button>
      <TransactionModal
        isOpen={modalIsOpen}
        onClose={onClose}
        transactionHash={transactionHash}
        errorMessage={errorMessage}
      />
    </VStack>
  );
};
