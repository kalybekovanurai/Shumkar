import { useState } from "react";
import { Button } from "../../../shared/ui/button/Button";

type Props = {
  currentName: string;
  onSave: (newName: string) => void;
};

export const ProfileEditNameCard = ({ currentName, onSave }: Props) => {
  const [name, setName] = useState(currentName);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const trimmed = name.trim();

    if (!trimmed) return;

    onSave(trimmed);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  return (
    <section className="bg-white rounded-[28px] p-6 md:p-8 shadow-md border border-[#EFE7D8]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-[#1E2A44]">
          Измени своё имя
        </h1>

        <span className="text-gray-300 text-2xl">×</span>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя"
        className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-300"
      />

      <p className="text-sm text-gray-400 mt-3">
        Можно использовать буквы и цифры
      </p>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="success" size="lg" onClick={handleSave}>
          СОХРАНИТЬ
        </Button>

        {saved && (
          <span className="text-sm font-semibold text-green-600">
            Имя сохранено
          </span>
        )}
      </div>
    </section>
  );
};
