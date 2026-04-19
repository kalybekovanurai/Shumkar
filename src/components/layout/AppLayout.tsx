import background from "../../assets/images/backgroundShumkar.jpg";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div
      className="w-full min-h-screen bg-repeat bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "auto",
      }}
    >
      <Outlet />
    </div>
  );
};


