import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addTumars, loseLife } from "../store/slices/playerSlice";
import { completeLevel } from "../store/slices/progressSlice";
import { quizData } from "../data/quizData";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quiz = quizData[Number(id)];

  const lives = useSelector((state: RootState) => state.player.lives);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shake, setShake] = useState(false);

  if (!quiz) return <div>Тест не найден</div>;

  const question = quiz.questions[current];

  const handleAnswer = (answerId: number) => {
    if (selected !== null) return;
    setSelected(answerId);
  };

  const handleNext = () => {
    const correct = question.answers.find((a) => a.correct);

    if (selected === correct?.id) {
      setScore((prev) => prev + 1);
      dispatch(addTumars(10));
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);

      dispatch(loseLife());

      if (lives - 1 <= 0) {
        alert("Жизни закончились 💔");
        navigate("/");
        return;
      }
    }

    setSelected(null);

    if (current + 1 >= quiz.questions.length) {
      dispatch(completeLevel(Number(id)));
      setShowResult(true);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EEE5] px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Результат</h1>

        <p className="text-xl mb-2">
          {score} / {quiz.questions.length}
        </p>

        <p className="mb-6 text-yellow-600 font-bold">
          +{score * 10} тумаров 🟡
        </p>

        {/* 🦅 ФИНАЛЬНАЯ ФРАЗА */}
        <div className="mb-8">
          <p className="text-2xl font-extrabold text-[#2B5FBA] animate-pulse">
            Ты хранитель легенд! 🦅
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#2B5FBA] text-white rounded-lg"
        >
          На карту
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-[#F2EEE5] px-4 ${
        shake ? "animate-shake" : ""
      }`}
    >
      <div className="mb-4 flex gap-1">
        {[...Array(lives)].map((_, i) => (
          <span key={i} className="text-red-500 text-xl animate-pop">
            ❤️
          </span>
        ))}
      </div>

      <div className="w-full max-w-md mb-6">
        <div className="h-3 bg-gray-300 rounded">
          <div
            className="h-3 bg-[#FCB602] rounded transition-all"
            style={{
              width: `${((current + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6 text-center">
        {question.question}
      </h2>

      <div className="w-full max-w-md flex flex-col gap-4">
        {question.answers.map((answer) => {
          const isSelected = selected === answer.id;
          const isCorrect = answer.correct;

          let bg = "bg-white";

          if (selected !== null) {
            if (isCorrect) bg = "bg-green-400 text-white";
            else if (isSelected) bg = "bg-red-400 text-white";
          }

          return (
            <button
              key={answer.id}
              onClick={() => handleAnswer(answer.id)}
              className={`p-4 rounded-xl shadow transition ${bg}`}
            >
              {answer.text}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          onClick={handleNext}
          className="mt-6 px-6 py-2 bg-[#2B5FBA] text-white rounded-lg"
        >
          Далее
        </button>
      )}
    </div>
  );
};

export default QuizPage;
