export interface ImageOption {
  id: number;
  text: string;
  image: string;
  correct: boolean;
}

export interface PictureQuestion {
  id: number;
  type: "image-choice";
  question: string;
  hint: string;
  options: ImageOption[];
}

export interface SequenceItem {
  id: number;
  text: string;
  image: string;
  order: number;
}

export interface LevelGame {
  id: number;
  title: string;
  pictureQuestions: PictureQuestion[];
  sequenceHint: string;
  sequenceGame: SequenceItem[];
}

export interface SubmitLevelPayload {
  selectedOptions: number[];
  sequenceOrder: number[];
}

export interface LevelState {
  level: LevelGame | null;
  loading: boolean;
  submitLoading: boolean;
  error: string | null;
}
