import { GameStatsCompact } from "../../features/game/ui/GameStatsCompact";
import { ImageChoiceQuestion } from "../../features/game/ui/ImageChoiceQuestion";
import { SequenceByClickGame } from "../../features/game/ui/SequenceByClickGame";
import { useLevelGamePage } from "../../features/level-game/model/useLevelGamePage";
import { ResultModal } from "../../shared/ui/modals/ResultModal";
import background from "../../assets/images/backgroundOthers.png";

const pageBg = {
  backgroundImage: `linear-gradient(rgba(247,243,234,0.66), rgba(247,243,234,0.66)), url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export const LevelGamePage = () => {
  const {
    level,
    loading,
    error,
    step,
    sequenceGame,
    sequenceHint,
    currentQuestion,
    totalQuestions,
    isSequenceStep,
    isBonusLevel,
    rewardMultiplier,
    isGameOver,
    isVictory,
    handleNextQuestion,
    handleFinishLevel,
    handlePlayAgain,
    handleBackToMap,
  } = useLevelGamePage();

  if (loading) {
    return (
      <div
        className="min-h-[calc(100dvh-84px)] flex items-center justify-center"
        style={pageBg}
      >
        Загрузка уровня...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-[calc(100dvh-84px)] flex items-center justify-center px-4"
        style={pageBg}
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
        style={pageBg}
      >
        Уровень не найден
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-84px)]" style={pageBg}>
      <div className="max-w-[1000px] mx-auto px-4 md:px-5 pt-3 pb-4">
        <div className="mb-3">
          <GameStatsCompact />
        </div>

        <div className="rounded-[24px] bg-white/42 border border-[#E8E0D2] shadow-sm backdrop-blur-[2px] px-3 md:px-4 py-3 md:py-4">
          {!isSequenceStep && currentQuestion ? (
            <ImageChoiceQuestion
              key={currentQuestion.id}
              levelTitle={level.title}
              levelNumber={level.id}
              questionId={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              hint={currentQuestion.hint}
              onNext={handleNextQuestion}
              rewardMultiplier={rewardMultiplier}
              currentStep={step + 1}
              totalSteps={totalQuestions}
            />
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
