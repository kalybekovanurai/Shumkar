import { Routes, Route } from "react-router-dom";
import QuizPage from "../landing/QuizPage";
import LessonPage from "../landing/LessonPage";
import { Map } from "../landing/Map";
import { modules } from "../data/modules";

import LeadersPage from "../pages/LeadersPage";
import ShopPage from "../pages/ShopPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Map modules={modules} />} />


      <Route path="/quiz/:id" element={<QuizPage />} />
      <Route path="/lesson/:id" element={<LessonPage />} />


      <Route path="/leaders" element={<LeadersPage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  );
}

export default AppRouter;
