import { useParams, useNavigate } from "react-router-dom";

const videoMap: Record<string, string> = {
  "101": "https://youtu.be/bR0NtC4fAN8",
  "102": "https://www.youtube.com/embed/ysz5S6PUM-U",
};

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoUrl = videoMap[id || ""];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EEE5] px-4">
      <h1 className="text-2xl font-bold mb-6">Урок {id}</h1>

      {/* 🎬 Видео */}
      <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="lesson video"
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            Видео не найдено
          </div>
        )}
      </div>

      {/* кнопка назад */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-[#2B5FBA] text-white rounded-lg"
      >
        Назад
      </button>
    </div>
  );
};

export default LessonPage;
