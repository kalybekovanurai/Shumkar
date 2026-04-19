import { useNavigate, useParams } from "react-router-dom";
import { modules } from "../data/modules";

const getEmbedUrl = (url: string) => {
  if (url.includes("youtu.be")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];
  }

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/").split("&")[0];
  }

  return url;
};

export const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let currentModule = null;
  let lessonIndex = -1;

  for (const module of modules) {
    const index = module.levels.findIndex(
      (lvl) => lvl.type === "lesson" && lvl.id.toString() === id,
    );

    if (index !== -1) {
      currentModule = module;
      lessonIndex = index;
      break;
    }
  }

  const lesson = currentModule?.levels[lessonIndex];

  const nextQuiz = currentModule?.levels
    .slice(lessonIndex + 1)
    .find((lvl) => lvl.type === "quiz");

  const rawUrl = lesson && lesson.type === "lesson" ? lesson.videoUrl : null;

  const videoUrl = rawUrl ? getEmbedUrl(rawUrl) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-6">
        {lesson && lesson.type === "lesson" ? lesson.title : "Урок не найден"}
      </h1>

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

      {nextQuiz && (
        <button
          onClick={() => navigate(`/quiz/${nextQuiz.id}`)}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
        >
          Пройти тест
        </button>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-2 bg-[#2B5FBA] text-white rounded-lg"
      >
        Назад
      </button>
    </div>
  );
};
