export type Answer = {
  id: number;
  text: string;
  correct: boolean;
};

export type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

export type Quiz = {
  id: number;
  questions: Question[];
};
