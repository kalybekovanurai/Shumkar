import { Routes, Route } from "react-router-dom";
import { MapPage } from "../../pages/MapPage";
import { modules } from "../../data/modules";
import { AppLayout } from "../../shared/layout/AppLayout";
import { LessonPage } from "../../pages/LessonPage";
import { LeadersPage } from "../../pages/LeadersPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { LoginPage } from "../../pages/LoginPage";
import { LevelGamePage } from "../../pages/LevelGamePage";
import { AchievementsPage } from "../../pages/AchievmentsPage";
import { ShopPage } from "../../pages/shop/ShopPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<MapPage modules={modules} />} />
        <Route path="/quiz/:id" element={<LevelGamePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaders" element={<LeadersPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/achievements" element={<AchievementsPage/>} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
