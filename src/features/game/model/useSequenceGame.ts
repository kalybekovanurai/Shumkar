import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";
import { useAppDispatch } from "../../../app/store/hooks";

import type { SequenceItem } from "./type";
import { giveSequenceReward, giveWrongAnswerPenalty } from "./gameRewards";
import { useHint } from "../../../entities/player/playerSlice";

type Params = {
  items: SequenceItem[];
  hint: string;
  onFinish: (sequenceOrder: number[]) => void;
  rewardMultiplier: number;
};

export const useSequenceGame = ({
  items,
  onFinish,
  rewardMultiplier,
}: Params) => {
  const dispatch = useAppDispatch();

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

  const selectedItems = selectedOrder
    .map((id) => shuffledItems.find((item) => item.id === id))
    .filter(Boolean) as SequenceItem[];

  const emptySlots = Math.max(items.length - selectedItems.length, 0);

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
    const isCorrect =
      selectedOrder.length === items.length &&
      selectedOrder.every((id, index) => {
        const selectedItem = items.find((item) => item.id === id);
        return selectedItem?.order === index + 1;
      });

    if (isCorrect) {
      setResult("success");

      if (!rewardGiven) {
        giveSequenceReward(dispatch, rewardMultiplier);
        setRewardGiven(true);
      }
    } else {
      setResult("error");
      giveWrongAnswerPenalty(dispatch);
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

  return {
    hintsCount,
    shuffledItems,
    selectedOrder,
    selectedItems,
    emptySlots,
    progressPercent,
    isModalOpen,
    result,
    showHintBox,
    handleSelect,
    handleReset,
    handleUseHint,
    handleCheck,
    handleModalClose,
  };
};
