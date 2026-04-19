import { Routes, Route } from "react-router-dom";
import QuizPage from "../pages/QuizPage";
import LessonPage from "../pages/LessonPage";
import { Map } from "../pages/Map";
import { modules } from "../data/modules";

import LeadersPage from "../pages/LeadersPage";
import ShopPage from "../pages/ShopPage";
import { AchievementsPage } from "../pages/AchievmentsPage";
import { AppLayout } from "../layout/AppLayout";

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Map modules={modules} />} />

        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />

        <Route path="/leaders" element={<LeadersPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
