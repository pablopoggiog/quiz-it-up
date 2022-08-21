import { useEffect, useState, Fragment, FunctionComponent } from "react";
import { useQuiz } from "@hooks";
import { Question as QuestionType } from "@types";

interface Props {
  question: QuestionType;
}

export const Question: FunctionComponent<Props> = ({ question }) => {
  const { lifetimeSeconds, image, text, options } = question;

  const [timer, setTimer] = useState<number>(lifetimeSeconds);

  const { answers, addNewAnswer } = useQuiz();

  useEffect(() => {
    answers.length && setTimer(lifetimeSeconds);
  }, [answers.length, lifetimeSeconds]);

  useEffect(() => {
    let counter = lifetimeSeconds;
    let myInterval: NodeJS.Timer;

    myInterval = setInterval(() => {
      if (counter > 0) {
        counter--;
        setTimer(counter);
        // ff there's no time left, automatically submit an empty answer
        if (counter === 0) {
          addNewAnswer(null);
        }
      } else {
        clearInterval(myInterval);
      }
    }, 1000);

    const cleanup = () => clearInterval(myInterval);
    return cleanup;
  }, [lifetimeSeconds, addNewAnswer]);

  return (
    <div>
      <p>{timer}</p>
      <p>{text}</p>
      {options?.map(({ text }, index) => (
        <Fragment key={index}>
          <span>{text}</span>
          <input
            key={index}
            type="checkbox"
            onChange={() => addNewAnswer(index)}
            checked={false}
          />
        </Fragment>
      ))}
    </div>
  );
};
