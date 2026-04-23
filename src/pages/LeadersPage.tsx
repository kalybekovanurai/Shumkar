import { useEffect } from "react";
import { useSelector } from "react-redux";
import happyShumkar from "../assets/images/happyShumkar.png";
import { PageBackgroundLayout } from "../shared/UI/PageBackgroundLayout";
import type { RootState } from "../app/store/store";
import { useAppDispatch } from "../app/store/hooks";
import { getLeaders } from "../app/store/leaders/leadersThunk";

export const LeadersPage = () => {
  const dispatch = useAppDispatch();

  const { leaders, loading, error } = useSelector(
    (state: RootState) => state.leaders,
  );

  useEffect(() => {
    dispatch(getLeaders());
  }, [dispatch]);

  if (loading) {
    return (
      <PageBackgroundLayout contentClassName="max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-lg font-semibold text-[#2B5FBA]">
            Загрузка лидеров...
          </p>
        </div>
      </PageBackgroundLayout>
    );
  }

  if (error) {
    return (
      <PageBackgroundLayout contentClassName="max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-center text-red-500 font-semibold">{error}</p>
        </div>
      </PageBackgroundLayout>
    );
  }

  return (
    <PageBackgroundLayout contentClassName="max-w-4xl mx-auto">
      <h1 className="text-center text-3xl md:text-4xl font-black text-[#2B5FBA] mb-6">
        🏆 Лидеры
      </h1>

      <div className="space-y-4">
        {leaders.map((user, index) => {
          const medalBg =
            index === 0
              ? "bg-yellow-100 text-yellow-700"
              : index === 1
                ? "bg-slate-100 text-slate-600"
                : index === 2
                  ? "bg-orange-100 text-orange-700"
                  : "bg-[#EEF3FF] text-[#2B5FBA]";

          return (
            <div
              key={user.id}
              className="bg-white/95 rounded-[24px] shadow-md border border-[#EFE7D8] px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0 ${medalBg}`}
                >
                  {index + 1}
                </div>

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow shrink-0"
                />

                <div className="min-w-0">
                  <p className="font-black text-xl md:text-2xl text-[#1E2A44] truncate">
                    {user.name}
                  </p>
                  <p className="text-sm md:text-base text-[#6B7280]">
                    🔥 Streak: {user.streak}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[#2B5FBA] font-black text-2xl md:text-3xl leading-none">
                  {user.score}
                </p>
                <p className="text-[#D4A62A] font-bold text-sm md:text-base mt-1">
                  тумар 🪙
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-[#F6EBCF]/95 rounded-[24px] border border-[#EBDDBB] px-5 py-4 flex items-center gap-4 shadow-sm">
        <img
          src={happyShumkar}
          alt="Шумкар"
          className="w-14 h-14 md:w-16 md:h-16 object-contain shrink-0"
        />
        <p className="text-[#6B5B2E] text-sm md:text-lg font-medium">
          Соревнуйся с друзьями и стань лучшим хранителем знаний!
        </p>
      </div>
    </PageBackgroundLayout>
  );
};
