export interface Answer {
  id: number;
  type: string;
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

  handleSubmit: () => void;
}
