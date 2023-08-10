import { useRef, useState } from 'react';
import ButtonContainer from '../button/ButtonContainer';
import ErrorContainer from '../error/ErrorContainer';
import {
  Container,
  Input,
  QuestionSubtitle,
  QuestionText,
} from './TextInput.styles';

export interface Answer {
  id: number;
  value: string;
}

export interface Question {
  id: number;
  validation?: string;
  isRequired: boolean;
  subTitle?: string;
  placeholder?: string;
  isLastQuestion?: boolean;
}

export interface TextInputProps {
  error: string;
  answers: Answer[];
  question: Question;
  onAnswer: (value: string, questionId: number) => void;
  showError: boolean;
  questionText: string;
  questionNumber: number;
  updateCurrentQuestionId: (questionId: number) => void;
  updateNextPage: () => void;
  isRequiredQuestionAnswered: () => boolean;
  handleShowError: (show: boolean) => void;
  shouldScroll: boolean;
  originalQuestionsOrder: number[];
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
  isRequiredQuestionAnswered,
  handleShowError,
  shouldScroll,
  originalQuestionsOrder,
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [shouldFocusInput, setShouldFocusInput] = useState<boolean>(false);
  const questionIndex = originalQuestionsOrder.indexOf(question.id);
  const calculatedQuestionNumber = questionIndex + 1;

  const handleButtonClick = () => {
    if (!isRequiredQuestionAnswered()) {
      // If required question is not answered, show error and return
      handleShowError(true);
      return;
    }

    const currentAnswer = answers.find((answer) => answer.id === question.id);
    if (!currentAnswer || currentAnswer.value.trim() === '') {
      // If the current question is not answered, show an error and return
      handleShowError(true); // Set a specific error message
      return;
    }

    updateNextPage();
    setShouldFocusInput(true); // Focus input after button click
  };

  const answer = answers.find((a) => a.id === question.id) || { value: '' };
  const answerValue = answer.value;

  // Focus the input when shouldFocusInput is true
  if (shouldFocusInput && inputRef.current) {
    inputRef.current.focus();
    setShouldFocusInput(false); // Reset the focus flag
  }

  return (
    <Container id={question.validation === 'phone' ? 'text-input' : ''}>
      <div className="question-number-container">
        <span className="question-number">{calculatedQuestionNumber}.</span>
        {/* <div question-text htmlFor={`question-${question.id}`}> */}
        <QuestionText key={question.id.toString()}>
          {questionText} {question.isRequired && <span>*</span>}
        </QuestionText>
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
            handleButtonClick={handleButtonClick}
          />
        )}
      </div>
    </Container>
  );
};

export default TextInput;
