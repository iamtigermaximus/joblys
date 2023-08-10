export interface Answer {
  id: number;
  type: string;
  value: string;
}

export interface FullScrollProps {
  isRequiredQuestionAnswered: () => boolean;
  answers: Answer[];
  handleShowError: (show: boolean) => void;
  checkIfLastQuestion: () => void;
  currentQuestionId: number;
  children: React.ReactNode;
}

export interface FullScrollPageProps {
  children: React.ReactNode;
}
