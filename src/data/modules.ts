import type { Module } from "../components/types/level";

export const modules: Module[] = [
  {
    id: 1,
    levels: [
      {
        type: "lesson",
        id: 101,
        title: "Сакральные места",
        videoUrl: "https://youtu.be/_934LJkmxAU",
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
        videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
        unlocked: true,
      },
      {
        type: "quiz",
        id: 3,
        unlocked: false,
      },
      {
        type: "quiz",
        id: 4,
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
        videoUrl: "https://youtu.be/_934LJkmxAU",
        unlocked: true,
      },
      {
        type: "quiz",
        id: 5,
        unlocked: false,
      },
      {
        type: "quiz",
        id: 6,
        unlocked: false,
      },
    ],
  },
];
