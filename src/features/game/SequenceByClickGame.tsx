import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTumars,
  addXp,
  increaseStreak,
  loseLife,
  useHint,
} from "../../app/store/player/playerSlice";
import type { RootState } from "../../app/store/store";
import type { SequenceItem } from "../../components/types/game";
import { ResultModal } from "../../shared/UI/modals/ResultModal";
import { QuestionHeader } from "./components/QuestionHeader";
import { HintPanel } from "./components/HintPanel";
import { GameActionBar } from "./components/GameActionBar";
import { SequenceCard } from "./components/SequenceCard";

type Props = {
  items: SequenceItem[];
  hint: string;
  onFinish: (sequenceOrder: number[]) => void;
  rewardMultiplier?: number;
};

export const SequenceByClickGame = ({
  items,
  hint,
  onFinish,
  rewardMultiplier = 1,
}: Props) => {
  const dispatch = useDispatch();
  const hintsCount = useSelector((state: RootState) => state.player.hints ?? 0);

  const shuffledItems = useMemo(() => {
    return [...items].sort(() => Math.random() - 0.5);
  }, [items]);

  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [rewardGiven, setRewardGiven] = useState(false);
  const [showHintBox, setShowHintBox] = useState(false);

  const progressPercent =
    items.length > 0 ? (selectedOrder.length / items.length) * 100 : 0;

  const handleSelect = (id: number) => {
    if (isModalOpen) return;
    if (selectedOrder.includes(id)) return;

    setSelectedOrder((prev) => [...prev, id]);
  };

  const handleReset = () => {
    setSelectedOrder([]);
    setResult(null);
    setIsModalOpen(false);
    setShowHintBox(false);
  };

  const handleUseHint = () => {
    if (hintsCount <= 0 || showHintBox) return;
    dispatch(useHint());
    setShowHintBox(true);
  };

  const handleCheck = () => {
    const correct =
      selectedOrder.length === items.length &&
      selectedOrder.every((id, index) => {
        const selectedItem = items.find((item) => item.id === id);
        return selectedItem?.order === index + 1;
      });

    if (correct) {
      setResult("success");

      if (!rewardGiven) {
        dispatch(addXp(30 * rewardMultiplier));
        dispatch(addTumars(3 * rewardMultiplier));
        dispatch(increaseStreak());
        setRewardGiven(true);
      }
    } else {
      setResult("error");
      dispatch(loseLife());
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if (result === "success") {
      onFinish(selectedOrder);
      return;
    }

    handleReset();
  };

  const getSelectedNumber = (id: number) => {
    const index = selectedOrder.indexOf(id);
    return index === -1 ? null : index + 1;
  };

  return (
    <div className="h-full w-full max-w-5xl mx-auto flex flex-col min-h-0">
      <QuestionHeader
        title="Расставь события по порядку"
        subtitle="Нажимай на карточки в правильной последовательности"
        progressPercent={progressPercent}
        progressText={`Выбрано: ${selectedOrder.length} из ${items.length}`}
      />

      <HintPanel
        hintsCount={hintsCount}
        showHintBox={showHintBox}
        hint={hint}
        onUseHint={handleUseHint}
      />

      <div className="flex-1 px-3 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 h-full items-start">
          {shuffledItems.map((item) => {
            const selectedNumber = getSelectedNumber(item.id);
            const isSelected = selectedOrder.includes(item.id);

            return (
              <SequenceCard
                key={item.id}
                item={item}
                selectedNumber={selectedNumber}
                isSelected={isSelected}
                onSelect={handleSelect}
              />
            );
          })}
        </div>
      </div>

      <GameActionBar
        onReset={handleReset}
        onCheck={handleCheck}
        canCheck={selectedOrder.length === items.length}
      />

      <ResultModal
        open={isModalOpen}
        mood={result === "success" ? "happy" : "sad"}
        title={result === "success" ? "Отлично! 🎉" : "Порядок неверный ❌"}
        text={
          result === "success"
            ? rewardMultiplier === 2
              ? "Ты правильно восстановил историю и получил двойную награду!"
              : "Ты правильно восстановил историю. Шумкар очень гордится тобой!"
            : `${hint} Ты потерял 1 жизнь.`
        }
        buttonText={result === "success" ? "Завершить" : "Попробовать снова"}
        onClose={handleModalClose}
      />
    </div>
  );
};
