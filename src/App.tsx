import Header from "./components/landing/Header";
import AppRouter from "./components/routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F2EEE5]  flex flex-col">
      <Header />

      <AppRouter />
    </div>
  );
};

export default App;
