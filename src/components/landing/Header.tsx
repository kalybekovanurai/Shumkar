import Logo from "../../assets/images/MurasGoLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

type HeaderProps = {
  userAvatarUrl?: string;
};

const Header = ({
  userAvatarUrl = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80",
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tumars = useSelector((state: RootState) => state.player.tumars);

  const streak = 1;
  const lives = 3;

  const getNavClass = (path: string) => {
    const isActive =
      location.pathname === path || (path === "/" && location.pathname === "/");

    return isActive
      ? "text-[#2B5FBA] font-bold border-b-2 border-[#2B5FBA] pb-1"
      : "text-[#2B5FBA] hover:text-[#1e4a9c] transition-colors";
  };

  return (
    <header className="bg-[#F1ECE2] border-b border-gray-200 py-4 px-10 grid grid-cols-3 items-center shadow-md font-sans">
      <div
        className="flex items-center gap-4 cursor-pointer hover:scale-105 transition"
        onClick={() => navigate("/")}
      >
        <img src={Logo} className="w-12 h-12" alt="Shumkar Logo" />
        <div>
          <h1 className="text-[#2B5FBA] font-black text-2xl leading-none">
            Shumkar
          </h1>
          <p className="text-xs text-[#2B5FBA]">Открой своё наследие</p>
        </div>
      </div>

      <nav className="flex justify-center items-center gap-10 text-base font-bold text-[#2B5FBA]">
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
   

      <div className="flex items-center justify-end gap-6">
        <div className="flex items-center gap-1 text-orange-500 font-bold text-xl animate-pulse">
          🔥 {streak}
        </div>

        <div className="flex items-center gap-1.5 text-amber-500 font-semibold">
          <span className="font-bold">{tumars}</span>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(lives)].map((_, i) => (
            <span key={i} className="text-red-500 text-2xl">
              ❤️
            </span>
          ))}
        </div>

        <div
          onClick={() => alert("Профиль скоро будет 😉")}
          className="cursor-pointer hover:scale-110 transition"
        >
          <img
            src={userAvatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-[#2B5FBA]"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
