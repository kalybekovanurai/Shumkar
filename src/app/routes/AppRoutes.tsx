import { Routes, Route } from "react-router-dom";
import { MapPage } from "../../pages/map/MapPage";
import { AppLayout } from "../../widgets/layout/AppLayout";
import { ShopPage } from "../../pages/shop/ShopPage";
import { LevelGamePage } from "../../pages/level-game/LevelGamePage";
import { LessonPage } from "../../pages/lesson/LessonPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { LeadersPage } from "../../pages/leaders/LeadersPage";
import { LoginPage } from "../../pages/login/LoginPage";
import { AchievementsPage } from "../../pages/achievements/AchievmentsPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<MapPage />} />
        <Route path="/quiz/:id" element={<LevelGamePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaders" element={<LeadersPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Route>
    </Routes>
  );
};
