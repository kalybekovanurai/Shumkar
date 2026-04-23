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
import background from "../assets/images/backgroundOthers.png";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { getLevelById, submitLevel } from "../app/store/level/levelThunk";

export const LevelGamePage = () => {
  const { id } = useParams();
  const levelId = Number(id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const levelState = useAppSelector((state) => state.level);
  const level = levelState?.level ?? null;
  const loading = levelState?.loading ?? false;
  const error = levelState?.error ?? null;

  const [step, setStep] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number>
  >({});

  const streak = useSelector((state: RootState) => state.player.streak ?? 0);
  const lives = useSelector((state: RootState) => state.player.lives ?? 0);

  useEffect(() => {
    if (!Number.isNaN(levelId)) {
      dispatch(getLevelById(levelId));
    }
  }, [dispatch, levelId]);

  if (loading) {
    return (
      <div
        className="min-h-[calc(100dvh-84px)] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(247,243,234,0.68), rgba(247,243,234,0.68)), url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        Загрузка уровня...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-[calc(100dvh-84px)] flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(247,243,234,0.68), rgba(247,243,234,0.68)), url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white/90 rounded-3xl shadow-xl px-8 py-6 text-center max-w-lg">
          <p className="text-lg font-semibold text-red-500">
            {typeof error === "string" ? error : "Произошла ошибка"}
          </p>
        </div>
      </div>
    );
  }

  if (!level) {
    return (
      <div
        className="min-h-[calc(100dvh-84px)] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(247,243,234,0.68), rgba(247,243,234,0.68)), url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        Уровень не найден
      </div>
    );
  }

  const pictureQuestions = level.pictureQuestions ?? [];
  const sequenceGame = level.sequenceGame ?? [];
  const sequenceHint = level.sequenceHint ?? "";

  const isBonusLevel = levelId === 901;
  const rewardMultiplier = isBonusLevel ? 2 : 1;

  const totalQuestions = pictureQuestions.length;
  const isSequenceStep = step >= totalQuestions;

  const handleNextQuestion = (questionId: number, selectedOptionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: selectedOptionId,
    }));
    setStep((prev) => prev + 1);
  };

  const handleFinishLevel = async (finalSequenceOrder: number[]) => {
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
      if (resultAction.payload.passed) {
        dispatch(completeLevel(levelId));
        dispatch(setBestStreak(streak));
        setIsVictory(true);
      }
    }
  };

  const handlePlayAgain = () => {
    dispatch(resetPlayer());
    setStep(0);
    setIsVictory(false);
    setSelectedOptions({});
  };

  const handleBackToMap = () => {
    navigate("/");
  };

  const isGameOver = lives <= 0;

  return (
    <div
      className="min-h-[calc(100dvh-84px)]"
      style={{
        backgroundImage: `linear-gradient(rgba(247,243,234,0.66), rgba(247,243,234,0.66)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1000px] mx-auto px-4 md:px-5 pt-3 pb-4">
        <div className="mb-3">
          <GameStatsCompact />
        </div>

        <div className="rounded-[24px] bg-white/42 border border-[#E8E0D2] shadow-sm backdrop-blur-[2px] px-3 md:px-4 py-3 md:py-4">
          {!isSequenceStep ? (
            pictureQuestions[step] ? (
              <ImageChoiceQuestion
                key={pictureQuestions[step].id}
                levelTitle={level.title}
                levelNumber={level.id}
                questionId={pictureQuestions[step].id}
                question={pictureQuestions[step].question}
                options={pictureQuestions[step].options}
                hint={pictureQuestions[step].hint}
                onNext={handleNextQuestion}
                rewardMultiplier={rewardMultiplier}
                currentStep={step + 1}
                totalSteps={pictureQuestions.length}
              />
            ) : null
          ) : (
            <SequenceByClickGame
              key={`sequence-${level.id}`}
              levelTitle={level.title}
              levelNumber={level.id}
              items={sequenceGame}
              hint={sequenceHint}
              onFinish={handleFinishLevel}
              rewardMultiplier={rewardMultiplier}
            />
          )}
        </div>
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
