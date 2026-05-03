import type { AuthUser } from "../../../features/auth/authSlice";

type Props = {
  user: AuthUser;
};

export const ProfileInfoCard = ({ user }: Props) => {
  return (
    <section className="bg-white rounded-[28px] p-6 md:p-8 shadow-md border border-[#EFE7D8]">
      <h1 className="text-2xl md:text-3xl font-black text-[#1E2A44] mb-6">
        Профиль
      </h1>

      <div className="flex items-center gap-4">
        <img
          src={user.photoURL}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <p className="text-xl font-black text-[#2B5FBA]">{user.name}</p>
          <p className="text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#F8FAFC] border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Статус</p>
          <p className="font-bold text-[#1E2A44] mt-1">Тестовый пользователь</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Роль</p>
          <p className="font-bold text-[#1E2A44] mt-1">Игрок Shumkar</p>
        </div>
      </div>
    </section>
  );
};
