type Props = {
  type: "quiz" | "lesson";
  id: number;
  title?: string;
  unlocked: boolean;
  completed?: boolean;
  onClick?: () => void;
};

const LevelNode = ({
  type,
  id,
  title,
  unlocked,
  completed = false,
  onClick,
}: Props) => {
  const isLesson = type === "lesson";

  return (
    <div
      onClick={unlocked ? onClick : undefined}
      className={`group ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}`}
    >
      {completed ? (
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-white text-2xl border-4 border-white shadow-lg bg-green-500">
          ✓
        </div>
      ) : (
        <div
          className={`
            ${isLesson ? "min-w-[140px] px-4 mb-6" : "w-28"}
            h-28 rounded-full flex items-center justify-center
            text-white font-bold shadow-lg text-center
            ${unlocked ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"}
          `}
        >
          <span className={isLesson ? "text-xl" : "text-3xl"}>
            {isLesson ? title : id}
          </span>
        </div>
      )}
    </div>
  );
};

export default LevelNode;
