import { Button } from "../../../shared/ui/button/Button";

type Props = {
  onReset: () => void;
  onCheck: () => void;
  canCheck: boolean;
};

export const GameActionBar = ({ onReset, onCheck, canCheck }: Props) => {
  return (
    <div className="shrink-0 border-t border-[#E5DED1] px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
        <Button variant="secondary" size="md" onClick={onReset}>
          Сбросить
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={onCheck}
          disabled={!canCheck}
        >
          Проверить
        </Button>
      </div>
    </div>
  );
};
