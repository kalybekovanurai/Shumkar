import type { Module } from "../types/level";

export const modules: Module[] = [
  {
    id: 1,
    levels: [
      {
        type: "lesson",
        id: 101,
        title: "Сакральные места",
        unlocked: true,
      },
      {
        type: "quiz",
        id: 1,
        unlocked: true,
      },
      {
        type: "quiz",
        id: 2,
        unlocked: false,
      },
    
    ],
  },
  {
    id: 2,
    levels: [
      {
        type: "lesson",
        id: 102,
        title: "Петроглифы",
        unlocked: true,
      },
      {
        type: "quiz",
        id: 4,
        unlocked: true,
      },
      {
        type: "quiz",
        id: 5,
        unlocked: false,
      },
    ],
  },
  {
    id: 3,
    levels: [
      {
        type: "lesson",
        id: 103,
        title: "Почему это важно сохранять?",
        unlocked: true,
      },
      {
        type: "quiz",
        id: 6,
        unlocked: false,
      },
      {
        type: "quiz",
        id: 7,
        unlocked: false,
      },
    ],
  },
];
