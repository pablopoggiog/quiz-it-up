import { useState } from "react";
import { TransactionModal } from "src/components";
import { useQuiz } from "@hooks";

export const Overview = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const { questions, answers, submitQuestions } = useQuiz();

  const closeModal = () => setModalIsOpen(false);
  const submit = async () => {
    setModalIsOpen(true);
    try {
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
            : error;

          closeModal();
          alert("Error: " + errorMessage);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Overview</h3>
      {answers.map((answer, index) => {
        return (
          <p key={index}>
            {questions[index].text}:{" "}
            {questions[index]?.options[answer as number]?.text ?? "no response"}
          </p>
        );
      })}
      <button onClick={submit}>Submit</button>
      <TransactionModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        transactionHash={transactionHash}
      />
    </div>
  );
};
