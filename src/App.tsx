import AppRouter from "./app/routes/AppRoutes";

export const App = () => {
  return (
    <div className="h-[100dvh] bg-[#F2EEE5] flex flex-col overflow-hidden">
      <AppRouter />
    </div>
  );
};
