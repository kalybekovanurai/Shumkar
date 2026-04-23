import { ShumkarCard } from "../../../features/game/ShumkarCard";
import { Button } from "../Button";

type Props = {
  open: boolean;
  mood: "happy" | "sad" | "hint";
  title: string;
  text: string;
  buttonText: string;
  onClose: () => void;
};

export const ResultModal = ({
  open,
  mood,
  title,
  text, 
  
  onClose,
}: Props) => {
  if (!open) return null;

  const buttonClass =
    mood === "happy"
      ? "bg-[#58CC02] hover:bg-[#4fb802] active:bg-[#46a402]"
      : mood === "sad"
        ? "bg-[#2B5FBA] hover:bg-[#2453a4] active:bg-[#1f488f]"
        : "bg-[#F59E0B] hover:bg-[#d98d08] active:bg-[#c57f07]";

  return (
    <div className="fixed inset-0 z-[100] bg-black/45 flex items-end sm:items-center justify-center px-3 sm:px-4">
      <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden animate-[fadeIn_.2s_ease]">
        <div className="p-4 sm:p-5">
          <ShumkarCard mood={mood} title={title} text={text} />
        </div>

        <div className="border-t border-gray-100 bg-[#F8F8F8] p-4">
          <Button variant="primary" size="lg" fullWidth onClick={onClose}>
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
};
