import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  completeLevel,
  setBestStreak,
} from "../app/store/progress/progressSlice";
import { resetPlayer } from "../app/store/player/playerSlice";
import { ResultModal } from "../shared/UI/modals/ResultModal";
import type { RootState } from "../app/store/store";
import { ImageChoiceQuestion } from "../features/game/ImageChoiceQuestion";
import { SequenceByClickGame } from "../features/game/SequenceByClickGame";
import { GameStatsCompact } from "../features/game/components/GameStatsCompact";
import { GameLevelHeader } from "../features/game/components/GameLevelHeader";
import background from "../assets/images/backgroundOthers.png";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { getLevelById, submitLevel } from "../app/store/level/levelThunk";

export const LevelGamePage = () => {
  const { id } = useParams();
  const levelId = Number(id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { level, loading, error } = useAppSelector((state) => state.level);

  const [step, setStep] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [sequenceOrder, setSequenceOrder] = useState<number[]>([]);

  const streak = useSelector((state: RootState) => state.player.streak ?? 0);
  const lives = useSelector((state: RootState) => state.player.lives ?? 0);

  useEffect(() => {
    if (!Number.isNaN(levelId)) {
      dispatch(getLevelById(levelId));
    }
  }, [dispatch, levelId]);

  if (loading) {
    return (
      <div className="min-h-[calc(100dvh-84px)] flex items-center justify-center bg-[#F7F3EA]">
        Загрузка уровня...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100dvh-84px)] flex items-center justify-center bg-[#F7F3EA] px-4">
        <div className="bg-white rounded-3xl shadow-xl px-8 py-6 text-center max-w-lg">
          <p className="text-lg font-semibold text-red-500">
            {typeof error === "string" ? error : "Произошла ошибка"}
          </p>
        </div>
      </div>
    );
  }

  if (!level) {
    return <div className="text-center mt-10">Уровень не найден</div>;
  }

  const pictureQuestions = level.pictureQuestions ?? [];
  const sequenceGame = level.sequenceGame ?? [];
  const sequenceHint = level.sequenceHint ?? "";

  const isBonusLevel = levelId === 901;
  const rewardMultiplier = isBonusLevel ? 2 : 1;

  const totalQuestions = pictureQuestions.length;
  const isSequenceStep = step >= totalQuestions;

  const handleNextQuestion = (selectedOptionId: number) => {
    setSelectedOptions((prev) => [...prev, selectedOptionId]);
    setStep((prev) => prev + 1);
  };

  const handleFinishLevel = async (finalSequenceOrder: number[]) => {
    setSequenceOrder(finalSequenceOrder);

    const resultAction = await dispatch(
      submitLevel({
        levelId,
        payload: {
          selectedOptions,
          sequenceOrder: finalSequenceOrder,
        },
      }),
    );

    if (submitLevel.fulfilled.match(resultAction)) {
      dispatch(completeLevel(levelId));
      dispatch(setBestStreak(streak));
      setIsVictory(true);
    }
  };

  const handlePlayAgain = () => {
    dispatch(resetPlayer());
    setStep(0);
    setIsVictory(false);
    setSelectedOptions([]);
    setSequenceOrder([]);
  };

  const handleBackToMap = () => {
    navigate("/");
  };

  const isGameOver = lives <= 0;

  return (
    <div
      className="h-[calc(100dvh-84px)] flex flex-col overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(247,243,234,0.92), rgba(247,243,234,0.92)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="shrink-0 px-3 pt-2">
        <GameStatsCompact />
      </div>

      <GameLevelHeader title={level.title} isBonus={isBonusLevel} />

      <div className="flex-1 min-h-0 px-2 pb-2">
        {!isSequenceStep ? (
          pictureQuestions[step] ? (
            <ImageChoiceQuestion
              key={pictureQuestions[step].id}
              question={pictureQuestions[step].question}
              options={pictureQuestions[step].options}
              hint={pictureQuestions[step].hint}
              onNext={handleNextQuestion}
              rewardMultiplier={rewardMultiplier}
            />
          ) : null
        ) : (
          <SequenceByClickGame
            key={`sequence-${level.id}`}
            items={sequenceGame}
            hint={sequenceHint}
            onFinish={handleFinishLevel}
            rewardMultiplier={rewardMultiplier}
          />
        )}
      </div>

      <ResultModal
        open={isGameOver}
        mood="sad"
        title="Игра окончена 💔"
        text="У тебя закончились жизни. Попробуй снова."
        buttonText="Играть снова"
        onClose={handlePlayAgain}
      />

      <ResultModal
        open={isVictory}
        mood="happy"
        title="Победа! 🎉"
        text={
          isBonusLevel
            ? "Ты получил двойную награду!"
            : "Ты успешно прошёл уровень!"
        }
        buttonText="На карту"
        onClose={handleBackToMap}
      />
    </div>
  );
};
