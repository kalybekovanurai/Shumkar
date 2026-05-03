import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  getLevelById,
  submitLevel,
} from "../../../entities/level/model/levelThunk";
import {
  completeLevel,
  setBestStreak,
} from "../../../entities/progress/progressSlice";
import { resetPlayer } from "../../../entities/player/playerSlice";

export const useLevelGamePage = () => {
  const { id } = useParams();
  const levelId = Number(id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { level, loading, error } = useAppSelector((state) => state.level);
  const { streak, lives } = useAppSelector((state) => state.player);

  const [step, setStep] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    if (!Number.isNaN(levelId)) {
      dispatch(getLevelById(levelId));
    }
  }, [dispatch, levelId]);

  const pictureQuestions = level?.pictureQuestions ?? [];
  const sequenceGame = level?.sequenceGame ?? [];
  const sequenceHint = level?.sequenceHint ?? "";

  const isBonusLevel = levelId === 901;
  const rewardMultiplier = isBonusLevel ? 2 : 1;

  const totalQuestions = pictureQuestions.length;
  const isSequenceStep = step >= totalQuestions;
  const currentQuestion = pictureQuestions[step];

  const isGameOver = lives <= 0;

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

    if (
      submitLevel.fulfilled.match(resultAction) &&
      resultAction.payload.passed
    ) {
      dispatch(completeLevel(levelId));
      dispatch(setBestStreak(streak));
      setIsVictory(true);
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

  return {
    level,
    loading,
    error,
    step,
    pictureQuestions,
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
  };
};
