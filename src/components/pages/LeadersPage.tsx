
type Leader = {
  id: number;
  name: string;
  avatar: string;
  score: number;
  streak: number;
};

const leaders: Leader[] = [
  {
    id: 1,
    name: "Aruzhan",
    avatar: "https://i.pravatar.cc/150?img=32",
    score: 980,
    streak: 12,
  },
  {
    id: 2,
    name: "Eldar",
    avatar: "https://i.pravatar.cc/150?img=12",
    score: 870,
    streak: 8,
  },
  {
    id: 3,
    name: "Miras",
    avatar: "https://i.pravatar.cc/150?img=5",
    score: 760,
    streak: 5,
  },
];

const LeadersPage = () => {
  return (
    <div className="min-h-screen bg-[#F1ECE2] px-6 py-10">
      <h1 className="text-3xl font-black text-[#2B5FBA] mb-8">🏆 Лидеры</h1>

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
              {user.score} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadersPage;
