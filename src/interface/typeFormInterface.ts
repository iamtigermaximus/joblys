export interface Answer {
  id: number;
  type: string;
  value: string;
}

export interface Question {
  id: number;
  type: string;
  text: string;
  isRequired: boolean;
  subTitle?: string;
  options?: string[];
  condition?(answers: Answer[]): boolean;
  maxSelect?: number;
  placeholder?: string;
  validation?: string;
  isLastQuestion?: boolean;
}
