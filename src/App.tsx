import { AppRouter } from "./app/routes/AppRoutes";

export const App = () => {
  return (
    <div className="min-h-screen bg-[#F2EEE5] flex flex-col">
      <AppRouter />
    </div>
  );
};
