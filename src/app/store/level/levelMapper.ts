import type {
  LevelGame,
  ImageOption,
  PictureQuestion,
  SequenceItem,
} from "./types";

const mapOption = (option: any): ImageOption => ({
  id: Number(option.id),
  text: option.text ?? "",
  image: option.image ?? "",
  correct: Boolean(option.correct),
});

const mapPictureQuestion = (question: any): PictureQuestion => ({
  id: Number(question.id),
  type: "image-choice",
  question: question.question ?? "",
  hint: question.hint ?? "",
  options: Array.isArray(question.options)
    ? question.options.map(mapOption)
    : [],
});

const mapSequenceItem = (item: any): SequenceItem => ({
  id: Number(item.id),
  text: item.text ?? "",
  image: item.image ?? "",
  order: Number(item.order ?? 0),
});

export const mapLevelFromApi = (data: any): LevelGame => {
  return {
    id: Number(data?.id ?? 0),
    title: data?.title ?? "",
    pictureQuestions: Array.isArray(data?.pictureQuestions)
      ? data.pictureQuestions.map(mapPictureQuestion)
      : Array.isArray(data?.picture_questions)
        ? data.picture_questions.map(mapPictureQuestion)
        : Array.isArray(data?.questions)
          ? data.questions.map(mapPictureQuestion)
          : [],
    sequenceHint: data?.sequenceHint ?? data?.sequence_hint ?? data?.hint ?? "",
    sequenceGame: Array.isArray(data?.sequenceGame)
      ? data.sequenceGame.map(mapSequenceItem)
      : Array.isArray(data?.sequence_game)
        ? data.sequence_game.map(mapSequenceItem)
        : Array.isArray(data?.sequence)
          ? data.sequence.map(mapSequenceItem)
          : [],
  };
};
