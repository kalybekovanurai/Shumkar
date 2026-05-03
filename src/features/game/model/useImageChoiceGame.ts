import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";
import { useAppDispatch } from "../../../app/store/hooks";
import type { ImageOption } from "./type";
import { giveImageChoiceReward, giveWrongAnswerPenalty } from "./gameRewards";
import { useHint } from "../../../entities/player/playerSlice";

type Params = {
  questionId: number;
  onNext: (questionId: number, selectedOptionId: number) => void;
  rewardMultiplier: number;
};

export const useImageChoiceGame = ({
  questionId,
  onNext,
  rewardMultiplier,
}: Params) => {
  const dispatch = useAppDispatch();

  const hintsCount = useSelector((state: RootState) => state.player.hints ?? 0);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHintBox, setShowHintBox] = useState(false);

  const handleSelect = (option: ImageOption) => {
    if (isAnswered) return;

    setSelectedId(option.id);
    setIsAnswered(true);
    setIsCorrectAnswer(option.correct);
    setIsModalOpen(true);

    if (option.correct) {
      giveImageChoiceReward(dispatch, rewardMultiplier);
    } else {
      giveWrongAnswerPenalty(dispatch);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if (selectedId !== null) {
      onNext(questionId, selectedId);
    }
  };

  const handleUseHint = () => {
    if (hintsCount <= 0 || showHintBox) return;

    dispatch(useHint());
    setShowHintBox(true);
  };

  return {
    hintsCount,
    selectedId,
    isAnswered,
    isCorrectAnswer,
    isModalOpen,
    showHintBox,
    handleSelect,
    handleModalClose,
    handleUseHint,
  };
};
