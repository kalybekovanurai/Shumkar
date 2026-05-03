export type ImageOption = {
  id: number;
  text: string;
  image: string;
  correct: boolean;
};

export type PictureQuestion = {
  id: number;
  type: "image-choice";
  question: string;
  hint: string;
  options: ImageOption[];
};

export type SequenceItem = {
  id: number;
  text: string;
  image: string;
  order: number;
};

export type LevelGame = {
  id: number;
  title: string;
  pictureQuestions: PictureQuestion[];
  sequenceHint: string;
  sequenceGame: SequenceItem[];
};
