import { Button } from "../../../shared/ui/button/Button";


type Props = {
  canCheck: boolean;
  onReset: () => void;
  onCheck: () => void;
};

export const SequenceFooter = ({ canCheck, onReset, onCheck }: Props) => {
  return (
    <div className="sticky bottom-0 bg-[#F7F3EA] border-t border-[#E5DED1] px-4 py-3 mt-auto">
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
