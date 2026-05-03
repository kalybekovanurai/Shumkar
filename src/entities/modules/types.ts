export type LessonItem = {
  type: "lesson";
  id: number;
  title: string;
  videoUrl: string;
  unlocked: boolean;
  completed?: boolean;
};

export type QuizItem = {
  type: "quiz";
  id: number;
  unlocked: boolean;
  completed?: boolean;
};

export type ModuleLevel = LessonItem | QuizItem;

export interface Module {
  id: number;
  levels: ModuleLevel[];
}

export interface ModulesState {
  modules: Module[];
  loading: boolean;
  error: string | null;
}
