import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import happyShumkar from "../../assets/images/happyShumkar.png";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { getLessonById } from "../../entities/lesson/lessonThunk";

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
  const dispatch = useAppDispatch();

  const { lesson, loading, error } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    if (id) {
      dispatch(getLessonById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <p className="text-lg font-semibold text-[#2B5FBA]">
          Загрузка урока...
        </p>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!lesson)
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <p className="text-lg font-semibold text-[#2B5FBA]">Урок не найден</p>
      </div>
    );

  const videoUrl = getEmbedUrl(lesson.videoUrl);
  const nextQuizId = lesson.levelIds?.[0];

  return (
    <div className="h-[calc(100dvh-88px)] bg-[#F7F3EA] px-3 md:px-4 py-3 md:py-4 overflow-hidden">
      <div className="h-full max-w-3xl mx-auto bg-[#F3EAD6] rounded-[28px] p-4 md:p-5 shadow-lg flex flex-col">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 mb-4 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-2xl bg-white shadow text-gray-700 font-semibold text-sm md:text-base"
          >
            ← Назад
          </button>

          <h1 className="text-xl md:text-3xl font-black text-[#2B5FBA] text-center truncate">
            {lesson.title}
          </h1>

          <div className="w-[92px] md:w-[110px]" />
        </div>

        <div className="bg-white rounded-[24px] p-3 md:p-4 shadow-md flex-1 min-h-0 flex flex-col">
          <div className="w-full max-h-[45vh] aspect-video rounded-[20px] overflow-hidden shadow mx-auto">
            <iframe
              src={videoUrl}
              title="lesson video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-4 flex flex-col md:flex-row items-center gap-3 shrink-0">
            <img
              src={happyShumkar}
              alt="Шумкар"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div className="flex-1 bg-[#F5EBCF] rounded-3xl px-4 py-3 text-gray-700 text-sm md:text-base shadow-sm">
              Отличная тема! Давай проверим, что ты запомнил(а)!
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                if (nextQuizId) {
                  navigate(`/quiz/${nextQuizId}`);
                }
              }}
              disabled={!nextQuizId}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-base md:text-lg font-bold px-6 py-3 rounded-2xl transition shadow"
            >
              ПРОЙТИ ТЕСТ
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-2xl bg-white border border-gray-200 font-semibold text-gray-700"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
