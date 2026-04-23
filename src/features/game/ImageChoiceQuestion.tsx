import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ImageOption } from "../../components/types/game";
import {
  addTumars,
  addXp,
  increaseStreak,
  loseLife,
  useHint,
} from "../../app/store/player/playerSlice";
import type { RootState } from "../../app/store/store";
import { ResultModal } from "../../shared/UI/modals/ResultModal";
import { QuestionHeader } from "./components/QuestionHeader";
import { HintPanel } from "./components/HintPanel";
import { ImageChoiceCard } from "./components/ImagineChoiceCard";


type Props = {
  question: string;
  options: ImageOption[];
  hint: string;
  onNext: (selectedOptionId: number) => void;
  rewardMultiplier?: number;
};

export const ImageChoiceQuestion = ({
  question,
  options,
  hint,
  onNext,
  rewardMultiplier = 1,
}: Props) => {
  const dispatch = useDispatch();
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
      dispatch(addXp(10 * rewardMultiplier));
      dispatch(addTumars(1 * rewardMultiplier));
      dispatch(increaseStreak());
    } else {
      dispatch(loseLife());
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if (selectedId !== null) {
      onNext(selectedId);
    }
  };

  const handleUseHint = () => {
    if (hintsCount <= 0 || showHintBox) return;
    dispatch(useHint());
    setShowHintBox(true);
  };

  return (
    <div className="h-full w-full max-w-5xl mx-auto flex flex-col min-h-0">
      <QuestionHeader title={question} subtitle="Выбери правильный ответ" />

      <HintPanel
        hintsCount={hintsCount}
        showHintBox={showHintBox}
        hint={hint}
        onUseHint={handleUseHint}
      />

      <div className="flex-1 min-h-0 px-3 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const isCorrect = isSelected && option.correct;
            const isWrong = isSelected && !option.correct;

            return (
              <ImageChoiceCard
                key={option.id}
                option={option}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isWrong={isWrong}
                isAnswered={isAnswered}
                onSelect={handleSelect}
              />
            );
          })}
        </div>
      </div>

      <ResultModal
        open={isModalOpen}
        mood={isCorrectAnswer ? "happy" : "sad"}
        title={isCorrectAnswer ? "Правильно! 🎉" : "Неправильно ❌"}
        text={
          isCorrectAnswer
            ? rewardMultiplier === 2
              ? "Молодец! Это верный ответ, и ты получил двойную награду."
              : "Молодец! Ты выбрал верный ответ."
            : `${hint} Ты потерял 1 жизнь.`
        }
        buttonText={isCorrectAnswer ? "Дальше" : "Продолжить"}
        onClose={handleModalClose}
      />
    </div>
  );
};
