import { leaders } from "../data/leadersData";

export const LeadersPage = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-[#FAFAF8] ">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#2B5FBA]">🏆 Лидеры</h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {leaders.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-[#2B5FBA] w-6">
                #{index + 1}
              </span>

              <img
                src={user.avatar}
                className="w-12 h-12 rounded-full border"
              />

              <div>
                <p className="font-bold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">
                  🔥 Streak: {user.streak}
                </p>
              </div>
            </div>

            <div className="text-[#2B5FBA] font-bold text-lg">
              {user.score} тумар
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

