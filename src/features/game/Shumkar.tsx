type Props = {
  mood: "happy" | "sad" | "hint";
  text: string;
};

export const Shumkar = ({ mood, text }: Props) => {
  const face = mood === "happy" ? "😄" : mood === "sad" ? "😢" : "🐦";

  const bg =
    mood === "happy"
      ? "bg-green-100"
      : mood === "sad"
        ? "bg-red-100"
        : "bg-yellow-100";

  return (
    <div className={`flex items-center gap-3 rounded-2xl p-4 shadow ${bg}`}>
      <div className="text-4xl">{face}</div>
      <p className="font-medium">{text}</p>
    </div>
  );
};
