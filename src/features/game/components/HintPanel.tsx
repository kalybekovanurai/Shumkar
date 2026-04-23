import { Button } from "../../../shared/UI/Button";

type Props = {
  hintsCount: number;
  showHintBox: boolean;
  hint: string;
  onUseHint: () => void;
};

export const HintPanel = ({
  hintsCount,
  showHintBox,
  hint,
  onUseHint,
}: Props) => {
  return (
    <>
      <div className="shrink-0 px-3 pb-3 flex justify-center">
        <Button
          variant="warning"
          size="sm"
          onClick={onUseHint}
          disabled={hintsCount <= 0 || showHintBox}
        >
          Подсказка 🧩 ({hintsCount})
        </Button>
      </div>

      {showHintBox && (
        <div className="shrink-0 mx-3 mb-3 rounded-[18px] border border-[#EBDDBB] bg-[#F6EBCF] px-4 py-3 text-center text-[#7A5B16] text-sm font-medium shadow-sm">
          {hint}
        </div>
      )}
    </>
  );
};
