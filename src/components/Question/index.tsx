import {
  useContext,
  useEffect,
  useState,
  useCallback,
  Fragment,
  FunctionComponent
} from "react";
import { QuizContext } from "@contexts";
import { Question as QuestionType } from "@types";

interface Props {
  question: QuestionType;
}

export const Question: FunctionComponent<Props> = ({ question }) => {
  const { lifetimeSeconds, image, text, options } = question;

  const [timer, setTimer] = useState<number>(lifetimeSeconds);

  const { answers, addNewAnswer } = useContext(QuizContext);

  const sumbitAnswer = useCallback(
    (option: number | null) => {
      addNewAnswer(option);
    },
    [addNewAnswer]
  );

  useEffect(() => {
    answers.length && setTimer(lifetimeSeconds);
  }, [answers.length, lifetimeSeconds]);

  useEffect(() => {
    let counter = lifetimeSeconds;
    let myInterval: NodeJS.Timer;

    myInterval = setInterval(() => {
      // setTimer(lifetimeSeconds);
      if (counter > 0) {
        counter--;
        setTimer(counter);
        // If there's no time left, automatically submit an empty answer
        if (counter === 0) {
          sumbitAnswer(null);
        }
      } else {
        clearInterval(myInterval);
      }
    }, 1000);

    return () => clearInterval(myInterval);
  }, [lifetimeSeconds, sumbitAnswer]);

  return (
    <div>
      <p>{timer}</p>
      <p>{text}</p>
      {options?.map(({ text }: any, index: number) => (
        <Fragment key={index}>
          <span>{text}</span>
          <input
            key={index}
            type="checkbox"
            onChange={() => sumbitAnswer(index)}
            checked={false}
          />
        </Fragment>
      ))}
    </div>
  );
};
