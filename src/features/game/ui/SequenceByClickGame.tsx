import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTumars,
  addXp,
  increaseStreak,
  loseLife,
  useHint,
} from "../../../entities/player/playerSlice";
import type { SequenceItem } from "../model/type";
import { ResultModal } from "../../../shared/ui/modals/ResultModal";
import type { RootState } from "../../../app/store";
import { Button } from "../../../shared/ui/button/Button";


type Props = {
  levelTitle: string;
  levelNumber: number;
  items: SequenceItem[];
  hint: string;
  onFinish: (sequenceOrder: number[]) => void;
  rewardMultiplier?: number;
};

export const SequenceByClickGame = ({
  levelTitle,
  levelNumber,
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

  const selectedItems = selectedOrder
    .map((id) => shuffledItems.find((item) => item.id === id))
    .filter(Boolean) as SequenceItem[];

  const emptySlots = Math.max(items.length - selectedItems.length, 0);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col">
      <div className="px-3 pt-1 pb-3 text-center">
        <div className="inline-flex items-center rounded-full bg-[#F4E7C5] px-3 py-1 text-xs md:text-sm font-bold text-[#8C6A2B] shadow-sm">
          Уровень {levelNumber}
        </div>

        <h1 className="mt-3 text-2xl md:text-[34px] xl:text-[38px] font-black text-[#102040] leading-tight">
          {levelTitle}
        </h1>

        <p className="mt-2 text-lg md:text-xl xl:text-2xl font-semibold text-[#243B63]">
          Расставь события по порядку
        </p>

        <p className="mt-2 text-sm md:text-base text-[#6C7890]">
          Выбрано: {selectedOrder.length} из {items.length}
        </p>

        <div className="max-w-xl mx-auto mt-4 h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4E86ED] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="px-3 pb-4">
        <div className="flex items-center justify-end">
          <Button
            onClick={handleUseHint}
            disabled={hintsCount <= 0 || showHintBox}
            className="px-4 py-2 rounded-full bg-[#F6EBCF] text-[#B6924C] font-bold border border-[#EAD9A7] disabled:opacity-70 text-sm md:text-base"
          >
            Подсказка 🧩 ({hintsCount})
          </Button>
        </div>

        {showHintBox && (
          <div className="mt-4 rounded-[18px] bg-white border border-[#E8D9B5] shadow-sm px-4 py-3 text-[#6B5B2E] text-sm md:text-base text-center">
            {hint}
          </div>
        )}

        <div className="mt-4 rounded-[22px] bg-white/84 border border-[#E7E2D8] shadow-sm p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {selectedItems.map((item, index) => (
              <div
                key={`selected-${item.id}`}
                className="rounded-[18px] border-2 border-[#4E86ED] bg-[#FDFEFF] p-2.5 shadow-sm"
              >
                <div className="relative w-full h-[82px] md:h-[88px] rounded-[14px] overflow-hidden bg-[#F3F4F6]">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-2 top-2 w-7 h-7 rounded-lg bg-white border border-[#DCE6FA] text-[#3C6FD8] font-black text-sm flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}

            {Array.from({ length: emptySlots }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="rounded-[18px] border-2 border-dashed border-[#E4D7B6] bg-[#FFFDF8] h-[108px] md:h-[114px] flex items-center justify-center"
              >
                <span className="text-[28px] md:text-[32px] font-black text-[#C7B48A]">
                  {selectedItems.length + index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 pb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4">
          {shuffledItems.map((item) => {
            const selectedNumber = selectedOrder.indexOf(item.id) + 1;
            const isSelected = selectedOrder.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                disabled={isModalOpen || isSelected}
                className={`
                  relative rounded-[20px] border-2 bg-white text-left shadow-sm transition-all duration-200 overflow-hidden
                  h-[185px] md:h-[195px]
                  ${
                    isSelected
                      ? "border-[#4E86ED] opacity-60 scale-[0.98]"
                      : "border-[#E7E2D8] hover:border-[#BFD3F8] hover:shadow-md"
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute left-3 top-3 z-10 w-8 h-8 rounded-full bg-[#4E86ED] text-white font-black text-sm flex items-center justify-center shadow">
                    {selectedNumber}
                  </div>
                )}

                <div className="p-3">
                  <div className="w-full h-[98px] md:h-[104px] rounded-[14px] overflow-hidden bg-[#F3F4F6] border border-[#ECECEC]">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="pt-3 px-1">
                    <p className="text-center text-[#102040] font-black text-[8px] md:text-[19px] leading-snug line-clamp-2">
                      {item.text}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handleReset}
            className="px-7 py-3 rounded-[18px] bg-[#4E86ED] enabled:hover:bg-[#3D78E6] text-white font-black text-base md:text-lg shadow-sm disabled:opacity-60"
          >
            ↻ Сбросить
          </Button>

          <Button
            onClick={handleCheck}
            disabled={selectedOrder.length !== items.length}
            className="px-7 py-3 rounded-[18px] bg-[#4E86ED] enabled:hover:bg-[#3D78E6] text-white font-black text-base md:text-lg shadow-sm disabled:opacity-60"
          >
            ✓ Проверить
          </Button>
        </div>
      </div>

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
