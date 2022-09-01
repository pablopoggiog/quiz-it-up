import Image from "next/image";
import { useEffect, useState, FunctionComponent } from "react";
import { VStack, Text, Flex, Progress, Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useQuiz } from "@hooks";
import { Question as QuestionType } from "@types";
import TimerIcon from "src/assets/timer.svg";

interface Props {
  question: QuestionType;
}

const AnimatedVstack = motion(VStack);

export const Question: FunctionComponent<Props> = ({ question }) => {
  const { lifetimeSeconds, text, options } = question;

  const [timer, setTimer] = useState<number>(lifetimeSeconds);

  const { quiz, answers, addNewAnswer } = useQuiz();

  // every time we submit a new answer, reset the timer
  useEffect(() => {
    answers.length && setTimer(lifetimeSeconds);
  }, [answers.length, lifetimeSeconds]);

  // every second, decrement the timer
  useEffect(() => {
    let counter = lifetimeSeconds;

    const myInterval = setInterval(() => {
      if (counter > 0) {
        counter--;
        setTimer(counter);
        // if there's no time left, automatically submit an empty answer
        if (counter === 0) {
          // I was actually pushing null as empty answer but the contract doesn't allow it, so will push 100 with that meaning of empty answer
          addNewAnswer(100);
        }
      } else {
        clearInterval(myInterval);
      }
    }, 1000);

    const cleanup = () => clearInterval(myInterval);
    return cleanup;
  }, [lifetimeSeconds, addNewAnswer]);

  const progress = Math.floor(
    ((answers.length + 1) * 100) / quiz.questions.length
  );

  return (
    <AnimatedVstack
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 200 }}
      p={10}
      gap={[5, 10]}
      shadow="dark-lg"
      rounded="lg"
      w={["full", "fit-content"]}
      minW="40%"
      bgColor="card.bg"
    >
      <Progress value={progress} w="full" rounded="lg" />
      <Flex gap={4} alignSelf="flex-start">
        <Image width={20} height={20} src={TimerIcon} alt="Timer icon" />
        <Text as="span" fontWeight="bold">
          {timer}&quot;
        </Text>
      </Flex>
      <Text fontWeight="bold" fontSize="xl">
        {text}
      </Text>
      <Flex
        w="full"
        gap={5}
        direction={["column", "row"]}
        justify="space-between"
      >
        {options?.map(({ text }, index) => (
          <Flex
            key={index}
            gap={4}
            justify="space-between"
            rounded="lg"
            bgColor="card.bg"
            p={4}
          >
            <Text>{text}</Text>
            <Checkbox onChange={() => addNewAnswer(index)} isChecked={false} />
          </Flex>
        ))}
      </Flex>
    </AnimatedVstack>
  );
};
