import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";


export const AppLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />

      <main className="flex-1 min-h-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
