import { useRef } from 'react';
import ButtonContainer from '../button/ButtonContainer';
import ErrorContainer from '../error/ErrorContainer';
import { Input, QuestionSubtitle } from './TextInput.styles';

interface Answer {
  id: number;
  value: string;
}

interface Question {
  id: number;
  validation?: string;
  isRequired: boolean;
  subTitle?: string;
  placeholder?: string;
  isLastQuestion?: boolean;
}

interface TextInputProps {
  error: string;
  answers: Answer[];
  question: Question;
  onAnswer: (value: string, questionId: number) => void;
  showError: boolean;
  questionText: string;
  questionNumber: number;
  updateCurrentQuestionId: (questionId: number) => void;
  updateNextPage: () => void;
}

const TextInput = ({
  error,
  answers,
  question,
  onAnswer,
  showError,
  questionText,
  questionNumber,
  updateCurrentQuestionId,
  updateNextPage,
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  const answer = answers.find((a) => a.id === question.id) || { value: '' };
  const answerValue = answer.value;

  return (
    <div
      className="question-container"
      id={question.validation === 'phone' ? 'text-input' : ''}
    >
      <div className="question-number-container">
        <span className="question-number">{questionNumber}.</span>
        {/* <div question-text htmlFor={`question-${question.id}`}> */}
        <label className="question-text" key={question.id.toString()}>
          {questionText} {question.isRequired && <span>*</span>}
        </label>
      </div>
      <QuestionSubtitle>
        <span>{question.subTitle}</span>
      </QuestionSubtitle>
      <div>
        <Input
          ref={inputRef}
          type="text"
          id={question.id.toString()}
          onChange={(e) => onAnswer(e.target.value, question.id)}
          placeholder={
            question.placeholder
              ? question.placeholder
              : 'Type your answer here ...'
          }
          value={answerValue}
        />
      </div>
      <div>{showError && <ErrorContainer error={error} />}</div>
      <div>
        {!showError && (
          <ButtonContainer
            buttonText={question.isLastQuestion === true ? 'Submit' : 'OK'}
            showPressEnterText={
              question.isLastQuestion === true ? 'Ctrl + Enter' : 'Enter'
            }
            showPressEnter={true}
            handleButtonClick={() => {
              updateNextPage();
              // updateCurrentQuestionId(question.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;
