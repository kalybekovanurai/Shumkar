export interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  description: string;
  levelIds: number[];
  unlocked?: boolean;
  completed?: boolean;
}

export interface LessonState {
  lesson: Lesson | null;
  loading: boolean;
  completeLoading: boolean;
  error: string | null;
}
