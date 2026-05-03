import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { ProfileEmptyState } from "../../features/profile/ui/ProfileEmptyState";
import { logoutUser, updateUserName } from "../../features/auth/authSlice";
import { ProfileSidebar } from "../../features/profile/ui/ProfileSidebar";
import { ProfileEditNameCard } from "../../features/profile/ui/ProfileEditNameCard";
import { ProfilePlaceholderCard } from "../../shared/ui/cards/ProfilePlaceholderCard";
import background from "../../assets/images/backgroundOthers.png";
import { ProfileInfoCard } from "../../shared/ui/cards/ProfileInfoCard";

type ProfileTab = "profile" | "name" | "settings" | "parents";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState<ProfileTab>("name");

  if (!user) {
    return <ProfileEmptyState/>;
  }

  const handleSaveName = (newName: string) => {
    dispatch(updateUserName(newName));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      className="min-h-[calc(100dvh-84px)] overflow-auto px-4 py-5 md:px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(247,243,234,0.68), rgba(247,243,234,0.68)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto rounded-[32px] bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe] p-6 md:p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          <ProfileSidebar
            user={user}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onLogout={handleLogout}
          />

          <div>
            {activeTab === "profile" && <ProfileInfoCard user={user} />}

            {activeTab === "name" && (
              <ProfileEditNameCard
                currentName={user.name}
                onSave={handleSaveName}
              />
            )}

            {activeTab === "settings" && (
              <ProfilePlaceholderCard
                title="Настройки"
                text="Здесь позже появятся настройки профиля, звука, уведомлений и языка."
              />
            )}

            {activeTab === "parents" && (
              <ProfilePlaceholderCard
                title="Для родителей"
                text="Здесь позже можно будет смотреть прогресс ребёнка, рекомендации и отчёты по обучению."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
