import Logo from "../../assets/icons/shumkarLogo2.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store/store";

type HeaderProps = {
  userAvatarUrl?: string;
};

export const Header = ({
  userAvatarUrl = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80",
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tumars = useSelector((state: RootState) => state.player.tumars ?? 0);
  const streak = useSelector((state: RootState) => state.player.streak ?? 0);
  const lives = useSelector((state: RootState) => state.player.lives ?? 0);
  const user = useSelector((state: RootState) => state.auth.user);

  const avatarSrc = user?.photoURL || userAvatarUrl;

  const getNavClass = (path: string) => {
    const isActive =
      location.pathname === path || (path === "/" && location.pathname === "/");

    return isActive
      ? "text-[#2B5FBA] font-black bg-[#EEF3FF] px-4 py-2 rounded-[16px] shadow-sm"
      : "text-[#2B5FBA] hover:text-[#214E9B] hover:bg-white/70 px-4 py-2 rounded-[16px] transition";
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DDC8] bg-[#F5EEDF]/92 backdrop-blur-md shadow-[0_2px_10px_rgba(120,100,60,0.08)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <button
          className="flex items-center gap-3 shrink-0 text-left"
          onClick={() => navigate("/")}
        >
          <img
            src={Logo}
            className="w-10 h-10 md:w-11 md:h-11"
            alt="Shumkar Logo"
          />
          <div>
            <h1 className="text-[#2B5FBA] font-black text-xl md:text-[28px] leading-none">
              Shumkar
            </h1>
            <p className="text-[10px] md:text-xs text-[#4670B9]">
              Открой своё наследие
            </p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-2 text-sm lg:text-base font-bold">
          <button onClick={() => navigate("/")} className={getNavClass("/")}>
            КАРТА
          </button>

          <button
            onClick={() => navigate("/leaders")}
            className={getNavClass("/leaders")}
          >
            ЛИДЕРЫ
          </button>

          <button
            onClick={() => navigate("/shop")}
            className={getNavClass("/shop")}
          >
            МАГАЗИН
          </button>

          <button
            onClick={() => navigate("/achievements")}
            className={getNavClass("/achievements")}
          >
            ДОСТИЖЕНИЯ
          </button>
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 rounded-full bg-white/85 border border-[#EADFC8] px-3 py-2 shadow-sm">
            <span className="text-orange-500 text-sm">🔥</span>
            <span className="font-bold text-orange-500 text-sm">{streak}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/85 border border-[#EADFC8] px-3 py-2 shadow-sm">
            <span className="text-yellow-500 text-sm">🪙</span>
            <span className="font-bold text-yellow-600 text-sm">{tumars}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/85 border border-[#EADFC8] px-3 py-2 shadow-sm">
            <span className="text-red-500 text-sm">❤️</span>
            <span className="font-bold text-red-500 text-sm">{lives}</span>
          </div>

          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 hover:scale-[1.02] transition"
          >
            <img
              src={avatarSrc}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-[#2B5FBA] object-cover shadow-sm"
            />
            {user?.name && (
              <span className="hidden lg:block text-sm font-bold text-[#2B5FBA] max-w-[110px] truncate">
                {user.name}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <nav className="flex flex-wrap justify-center gap-2 text-sm font-bold">
          <button onClick={() => navigate("/")} className={getNavClass("/")}>
            КАРТА
          </button>
          <button
            onClick={() => navigate("/leaders")}
            className={getNavClass("/leaders")}
          >
            ЛИДЕРЫ
          </button>
          <button
            onClick={() => navigate("/shop")}
            className={getNavClass("/shop")}
          >
            МАГАЗИН
          </button>
          <button
            onClick={() => navigate("/achievements")}
            className={getNavClass("/achievements")}
          >
            ДОСТИЖЕНИЯ
          </button>
        </nav>
      </div>
    </header>
  );
};
