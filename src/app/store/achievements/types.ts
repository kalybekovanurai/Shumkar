export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface AchievementsState {
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
}
