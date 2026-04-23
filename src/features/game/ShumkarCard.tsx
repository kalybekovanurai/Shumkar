import happyShumkar from "../../assets/images/happyShumkar.png";
import sadShumkar from "../../assets/images/sadShumkar.png";
import hintShumkar from "../../assets/images/happyShumkar.png";

type Props = {
  mood: "happy" | "sad" | "hint";
  title: string;
  text: string;
};

export const ShumkarCard = ({ mood, title, text }: Props) => {
  const bgClass =
    mood === "happy"
      ? "bg-green-50 border-green-100"
      : mood === "sad"
        ? "bg-red-50 border-red-100"
        : "bg-yellow-50 border-yellow-100";

  const titleClass =
    mood === "happy"
      ? "text-green-700"
      : mood === "sad"
        ? "text-red-700"
        : "text-yellow-800";

  const imageSrc =
    mood === "happy" ? happyShumkar : mood === "sad" ? sadShumkar : hintShumkar;

  return (
    <div className={`rounded-3xl border p-4 sm:p-5 ${bgClass}`}>
      <div className="flex items-start gap-4">
        <img
          src={imageSrc}
          alt="Шумкар"
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className={`text-lg sm:text-xl font-black ${titleClass}`}>
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-700">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
