import type { AuthUser } from "../../auth/authSlice";

type ProfileTab = "profile" | "name" | "settings" | "parents";

type Props = {
  user: AuthUser;
  activeTab: ProfileTab;
  onChangeTab: (tab: ProfileTab) => void;
  onLogout: () => void;
};

export const ProfileSidebar = ({
  user,
  activeTab,
  onChangeTab,
  onLogout,
}: Props) => {
  const getItemClass = (tab: ProfileTab) =>
    activeTab === tab
      ? "bg-blue-100 text-[#2B5FBA] font-semibold"
      : "text-[#1E2A44] hover:bg-gray-100";

  return (
    <aside className="bg-white rounded-[28px] p-5 shadow-md border border-[#EFE7D8]">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <img
          src={user.photoURL}
          alt={user.name}
          className="w-16 h-16 rounded-full border object-cover"
        />

        <div className="min-w-0">
          <h2 className="font-black text-[#2B5FBA] text-lg truncate">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={() => onChangeTab("profile")}
          className={`w-full text-left px-4 py-3 rounded-2xl transition ${getItemClass("profile")}`}
        >
          Профиль
        </button>

        <button
          onClick={() => onChangeTab("name")}
          className={`w-full text-left px-4 py-3 rounded-2xl transition ${getItemClass("name")}`}
        >
          Изменить имя
        </button>

        <button
          onClick={() => onChangeTab("settings")}
          className={`w-full text-left px-4 py-3 rounded-2xl transition ${getItemClass("settings")}`}
        >
          Настройки
        </button>

        <button
          onClick={() => onChangeTab("parents")}
          className={`w-full text-left px-4 py-3 rounded-2xl transition ${getItemClass("parents")}`}
        >
          Для родителей
        </button>

        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition"
        >
          Выход
        </button>
      </div>
    </aside>
  );
};
