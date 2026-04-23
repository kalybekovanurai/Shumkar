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
import { Button } from "../../shared/UI/Button";

type Props = {
  levelTitle: string;
  levelNumber: number;
  questionId: number;
  question: string;
  options: ImageOption[];
  hint: string;
  onNext: (questionId: number, selectedOptionId: number) => void;
  rewardMultiplier?: number;
  currentStep?: number;
  totalSteps?: number;
};

export const ImageChoiceQuestion = ({
  levelTitle,
  levelNumber,
  questionId,
  question,
  options,
  hint,
  onNext,
  rewardMultiplier = 1,
  currentStep = 1,
  totalSteps = 1,
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
      onNext(questionId, selectedId);
    }
  };

  const handleUseHint = () => {
    if (hintsCount <= 0 || showHintBox) return;
    dispatch(useHint());
    setShowHintBox(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col">
      <div className="px-3 pt-1 pb-3 text-center">
        <div className="inline-flex items-center rounded-full bg-[#F4E7C5] px-3 py-1 text-xs md:text-sm font-bold text-[#8C6A2B] shadow-sm">
          Уровень {levelNumber}
        </div>

        <h1 className="mt-3 text-2xl md:text-[34px] xl:text-[38px] font-black text-[#102040] leading-tight">
          {levelTitle}
        </h1>

        <p className="mt-2 text-lg md:text-xl xl:text-2xl font-semibold text-[#243B63]">
          Вопрос {currentStep} из {totalSteps}
        </p>

        <div className="max-w-sm mx-auto mt-4">
          <div className="flex items-center justify-between gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isPassed = stepNumber < currentStep;

              return (
                <div
                  key={stepNumber}
                  className={`
                    flex-1 h-2.5 rounded-full transition-all
                    ${isActive ? "bg-[#4A86F0]" : isPassed ? "bg-[#B9D0FA]" : "bg-[#E5E7EB]"}
                  `}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="rounded-[22px] bg-white/84 border border-[#E7E2D8] shadow-sm p-4 md:p-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <h2 className="text-xl md:text-[24px] xl:text-[28px] font-black text-[#102040]">
              {question}
            </h2>

            <Button
              onClick={handleUseHint}
              disabled={hintsCount <= 0 || showHintBox}
              className="px-4 py-2 rounded-full bg-[#F6EBCF] text-[#B6924C] font-bold border border-[#EAD9A7] disabled:opacity-70 text-sm md:text-base"
            >
              Подсказка 🧩 ({hintsCount})
            </Button>
          </div>

          {showHintBox && (
            <div className="mt-4 rounded-[18px] bg-[#FFFDF7] border border-[#E8D9B5] shadow-sm px-4 py-3 text-[#6B5B2E] text-sm md:text-base">
              {hint}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {options.map((option) => {
              const isSelected = selectedId === option.id;
              const isCorrect = isSelected && option.correct;
              const isWrong = isSelected && !option.correct;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className={`
                    rounded-[22px] border-[3px] bg-white text-left shadow-sm transition-all duration-200 overflow-hidden
                    ${
                      isCorrect
                        ? "border-[#4A86F0] shadow-md ring-2 ring-[#4A86F0]/15"
                        : isWrong
                          ? "border-[#E25555] shadow-md ring-2 ring-[#E25555]/10"
                          : "border-[#E7E2D8] hover:border-[#BFD3F8] hover:shadow-md"
                    }
                  `}
                >
                  <div className="p-3">
                    <div className="w-full h-[150px] md:h-[165px] xl:h-[180px] rounded-[16px] overflow-hidden bg-[#F3F4F6] border border-[#ECECEC]">
                      <img
                        src={option.image}
                        alt={option.text}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="pt-4">
                      <p className="text-center text-[#102040] font-black text-lg md:text-[20px] xl:text-[22px] leading-tight min-h-[52px] flex items-center justify-center">
                        {option.text}
                      </p>
                    </div>

                    <div className="pt-3 flex justify-center">
                      <div
                        className={`
                          w-9 h-9 rounded-full border-[3px] flex items-center justify-center text-base font-black
                          ${
                            isCorrect
                              ? "bg-[#4A86F0] border-[#4A86F0] text-white"
                              : isWrong
                                ? "bg-[#E25555] border-[#E25555] text-white"
                                : "bg-white border-[#DDD6C8] text-transparent"
                          }
                        `}
                      >
                        {isCorrect ? "✓" : isWrong ? "✕" : "•"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-3 pb-2">
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={() => window.history.back()}
            className="px-7 py-3 rounded-[18px] bg-[#4E86ED] text-white font-black text-base md:text-lg shadow-sm disabled:opacity-60"
          >
            ← Выйти
          </Button>

          <Button
            disabled={!isAnswered}
            className="px-7 py-3 rounded-[18px] bg-[#4E86ED] text-white font-black text-base md:text-lg shadow-sm disabled:opacity-60"
          >
            Дальше →
          </Button>
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
