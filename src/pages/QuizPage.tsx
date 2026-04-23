import { useState } from "react";

type Option = {
  id: number;
  text: string;
  image: string;
  correct: boolean;
};

type Props = {
  question: string;
  options: Option[];
  onNext: () => void;
};

export const ImageChoiceQuestion = ({
  question,
  options,
  onNext,
}: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const selectedOption = options.find((item) => item.id === selectedId);

  const handleSelect = (option: Option) => {
    if (isAnswered) return;
    setSelectedId(option.id);
    setIsAnswered(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">{question}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = isSelected && option.correct;
          const isWrong = isSelected && !option.correct;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`rounded-2xl border-4 p-3 bg-white shadow transition hover:scale-105
                ${isCorrect ? "border-green-500" : ""}
                ${isWrong ? "border-red-500" : ""}
                ${!isSelected ? "border-gray-200" : ""}
              `}
            >
              <img
                src={option.image}
                alt={option.text}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <p className="text-lg font-medium">{option.text}</p>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="text-center mt-6">
          <p className="text-xl mb-4">
            {selectedOption?.correct ? "Правильно! 🎉" : "Попробуй ещё раз"}
          </p>

          {selectedOption?.correct && (
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
            >
              Дальше
            </button>
          )}
        </div>
      )}
    </div>
  );
}
