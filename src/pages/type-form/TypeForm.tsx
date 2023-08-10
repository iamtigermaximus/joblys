import { useEffect, useState } from 'react';
import { questions } from '../../helpers/questions';
import TextInput from '../../components/textInput/TextInput';
import FullScroll from '../../components/fullScroll/FullScroll';
import { Container } from './TypeForm.styles';
import { isValidEmail, isValidPhoneNumber } from '../../helpers/validation';
import { Answer, Question } from '../../interface/typeFormInterface';

function TypeForm() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);
  const [originalQuestionsOrder, setOriginalQuestionsOrder] = useState<
    number[]
  >([]);

  useEffect(() => {
    const order = questions.map((question) => question.id);
    setOriginalQuestionsOrder(order);
  }, []);

  const updateCurrentQuestionNumber = (
    prevQuestionNumber: number,
    questionId: number
  ) =>
    questionId > currentQuestionId
      ? prevQuestionNumber + 1
      : questionId < currentQuestionId
      ? prevQuestionNumber - 1
      : prevQuestionNumber;

  const updateCurrentQuestionId = (questionId: number) => {
    setQuestionNumber((prevQuestionNumber) => {
      return updateCurrentQuestionNumber(prevQuestionNumber, questionId);
    });

    setCurrentQuestionId(questionId);
  };

  const handleAnswer = (answer: string, questionId: number) => {
    if (!answer === null || answer.length === 0) {
      removeAnswer();
      return;
    }

    if (showError === true) {
      setShowError(false);
    }

    let currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (
      currentQuestion &&
      currentQuestion.validation === 'phone' &&
      !isValidPhoneNumber(answer)
    ) {
      const phoneElement = document.getElementById('text-input');
      if (phoneElement) {
        phoneElement.classList.add('shake');
        setError('Numbers only please');
        handleShowError(true);
        setTimeout(() => {
          phoneElement.classList.remove('shake');
          handleShowError(false);
        }, 800);
      }
      return;
    }

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const existingAnswer = newAnswers.find((a) => a.id === questionId);
      if (existingAnswer) {
        existingAnswer.value = answer;
      } else {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
          newAnswers.push({
            id: questionId,
            type: question.type,
            value: answer,
          });
        }
      }
      return newAnswers;
    });
  };

  const getCurrentQuestion = (question: Question, shouldScroll: boolean) => {
    const answerWithId1 = answers.find((a) => a.id === 1);

    let name = '';
    if (answerWithId1 !== undefined) {
      name = answerWithId1.value;
    }

    const questionText = question.text.replace('{name}', name);

    if (question.condition && !question.condition(answers)) {
      return null;
    }

    return (
      <TextInput
        key={question.id}
        error={error}
        answers={answers}
        question={question}
        onAnswer={handleAnswer}
        showError={showError}
        questionText={questionText}
        questionNumber={questionNumber}
        updateCurrentQuestionId={updateCurrentQuestionId}
        updateNextPage={updateNextPage}
        handleShowError={handleShowError}
        isRequiredQuestionAnswered={isRequiredQuestionAnswered}
        shouldScroll={shouldScroll}
        originalQuestionsOrder={originalQuestionsOrder}
      />
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleShowError = (newError: boolean) => {
    setTimeout(() => {
      setShowError(newError);
    });
  };

  const removeAnswer = () => {
    let newAnswers = [...answers];
    let currAnsIndex = answers.findIndex((ans) => {
      return ans.id === currentQuestionId;
    });
    newAnswers.splice(currAnsIndex, 1);
    setAnswers([...newAnswers]);
  };

  const isRequiredQuestionAnswered = () => {
    let currentQuestion = questions.find((q) => q.id === currentQuestionId);
    let currentAnswer = answers.find((a) => a.id === currentQuestionId);

    if (!currentQuestion || currentQuestion.isRequired !== true) return true;

    if (currentAnswer) {
      if (currentAnswer.value === null || currentAnswer.value.length === 0) {
        if (currentQuestion.type === 'text') {
          handleSetError('Please fill this in');
        } else {
          handleSetError('Please make a selection');
        }

        removeAnswer();
        return false;
      }

      if (currentQuestion.validation === 'email') {
        if (isValidEmail(currentAnswer.value)) {
          return true;
        }

        handleSetError("Hmmm... that email doesn't look right");
        return false;
      }

      if (
        currentQuestion.validation === 'phone' &&
        currentQuestion.type === 'phone'
      ) {
        if (isValidPhoneNumber(currentAnswer.value)) {
          return true;
        }

        handleSetError("Hmmm... that phone number doesn't look right");
        return false;
      }
      return true;
    }

    if (currentQuestion.type === 'text') {
      handleSetError('Please fill this in');
    } else {
      handleSetError('Please make a selection');
    }
    return false;
  };

  const updateNextPage = () => {
    // Check if the current question is answered and valid
    if (!isRequiredQuestionAnswered()) {
      setError('Please fill in the answer.'); // Set a specific error message
      setShowError(true);
      return;
    }

    const currentAnswer = answers.find(
      (answer) => answer.id === currentQuestionId
    );
    if (!currentAnswer || currentAnswer.value.trim() === '') {
      setError('Please fill in the answer.'); // Set a specific error message
      setShowError(true);
      return;
    }

    // Logging the complete answers when the "OK" button is clicked
    // console.log('Collected Data:', answers);
    // console.table(answers);
    checkIfLastQuestion();
  };

  const handleSetError = (newError: string) => {
    setError(newError);
  };
  const checkIfLastQuestion = () => {
    let currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (
      currentQuestion &&
      currentQuestion.isLastQuestion &&
      isRequiredQuestionAnswered()
    ) {
      setSubmitForm(true);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (submitForm) {
    console.log('Collected Data:', answers);
    console.table(answers);

    return <h1>Complete</h1>;
  }
  return (
    <Container>
      <FullScroll
        isRequiredQuestionAnswered={isRequiredQuestionAnswered}
        answers={answers}
        handleShowError={handleShowError}
        checkIfLastQuestion={checkIfLastQuestion}
        currentQuestionId={currentQuestionId}
      >
        {questions.map((question) => {
          // Find the current answer for the question
          const currentAnswer = answers.find(
            (answer) => answer.id === question.id
          );

          // Determine if scrolling to next page/question is allowed based on whether the input is empty
          const shouldScroll = currentAnswer
            ? currentAnswer.value.trim() !== ''
            : true;

          return getCurrentQuestion(question, shouldScroll); // Pass shouldScroll as an argument
        })}
      </FullScroll>
    </Container>
  );
}

export default TypeForm;
