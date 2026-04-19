import { useParams, useNavigate } from "react-router-dom";

const videoMap: Record<string, string> = {
  "Первый урок": "https://youtu.be/_934LJkmxAU?si=LIIJ7oy1fIMG4RHa",
  "Второй урок": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
};

const getEmbedUrl = (url: string) => {
  if (url.includes("youtu.be")) {
    return url.replace("youtu.be/", "youtube.com/embed/");
  }

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  return url;
};

export const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const rawUrl = videoMap[id || ""];
  const videoUrl = rawUrl ? getEmbedUrl(rawUrl) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-6">Урок {id}</h1>

      <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="lesson video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            Видео не найдено
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-[#2B5FBA] text-white rounded-lg"
      >
        Назад
      </button>
    </div>
  );
};
