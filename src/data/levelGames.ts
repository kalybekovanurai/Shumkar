import type { LevelGame } from "../components/types/game";

export const levelGames: Record<number, LevelGame> = {
  1: {
    id: 1,
    title: "История о девушке и озере Иссык-Куль",
    pictureQuestions: [
      {
        id: 1,
        type: "image-choice",
        question: "Кто была девушка в истории?",
        hint: "Шумкар: Она была доброй девушкой, а не злой волшебницей 👀",
        options: [
          {
            id: 1,
            text: "Злая волшебница",
            image: "/images/level1/witch.png",
            correct: false,
          },
          {
            id: 2,
            text: "Добрая девушка",
            image: "/images/level1/girl.png",
            correct: true,
          },
          {
            id: 3,
            text: "Королева",
            image: "/images/level1/queen.png",
            correct: false,
          },
        ],
      },
      {
        id: 2,
        type: "image-choice",
        question: "Кто хотел забрать девушку?",
        hint: "Шумкар: Это был не друг и не добрый правитель...",
        options: [
          {
            id: 1,
            text: "Добрый хан",
            image: "/images/level1/good-khan.png",
            correct: false,
          },
          {
            id: 2,
            text: "Злой хан",
            image: "/images/level1/evil-khan.png",
            correct: true,
          },
          {
            id: 3,
            text: "Друг",
            image: "/images/level1/friend.png",
            correct: false,
          },
        ],
      },
    ],
    sequenceHint:
      "Шумкар: Сначала жила девушка, потом хан захотел её забрать, потом случилась трагедия, и потом появилось озеро.",
    sequenceGame: [
      {
        id: 1,
        text: "Жила добрая девушка",
        image: "/images/level1/girl.png",
        order: 1,
      },
      {
        id: 2,
        text: "Злой хан захотел её забрать",
        image: "/images/level1/evil-khan.png",
        order: 2,
      },
      {
        id: 3,
        text: "Произошла трагедия",
        image: "/images/level1/tragedy.png",
        order: 3,
      },
      {
        id: 4,
        text: "Появилось озеро Иссык-Куль",
        image: "/images/level1/lake.png",
        order: 4,
      },
    ],
  },

  2: {
    id: 2,
    title: "Легенда о башне Буране",
    pictureQuestions: [
      {
        id: 1,
        type: "image-choice",
        question: "Что стояло среди степей?",
        hint: "Шумкар: Это было высокое сооружение, куда спрятали девочку.",
        options: [
          {
            id: 1,
            text: "Замок",
            image: "/images/level2/castle.png",
            correct: false,
          },
          {
            id: 2,
            text: "Башня",
            image: "/images/level2/tower.png",
            correct: true,
          },
          {
            id: 3,
            text: "Дерево",
            image: "/images/level2/tree.png",
            correct: false,
          },
        ],
      },
      {
        id: 2,
        type: "image-choice",
        question: "Кем была девочка?",
        hint: "Шумкар: Она была не обычной жительницей. Её отец был ханом.",
        options: [
          {
            id: 1,
            text: "Дочь хана",
            image: "/images/level2/khan-daughter.png",
            correct: true,
          },
          {
            id: 2,
            text: "Принцесса",
            image: "/images/level2/princess.png",
            correct: false,
          },
          {
            id: 3,
            text: "Обычная жительница",
            image: "/images/level2/villager.png",
            correct: false,
          },
        ],
      },
    ],
    sequenceHint:
      "Шумкар: Сначала старец сделал предсказание, потом хан построил башню, потом девочка жила в башне, а позже появилась змея.",
    sequenceGame: [
      {
        id: 1,
        text: "Старец сделал предсказание",
        image: "/images/level2/old-man.png",
        order: 1,
      },
      {
        id: 2,
        text: "Хан построил башню",
        image: "/images/level2/tower.png",
        order: 2,
      },
      {
        id: 3,
        text: "Девочка жила в башне",
        image: "/images/level2/girl-in-tower.png",
        order: 3,
      },
      {
        id: 4,
        text: "Появился жук",
        image: "/images/level2/snake.png",
        order: 4,
      },
    ],
  },
  901: {
    id: 901,
    title: "Бонус: Тайны сакральных легенд",

    pictureQuestions: [
      {
        id: 1,
        type: "image-choice",
        question: "Что появилось после трагедии?",
        hint: "Шумкар: Это большое красивое озеро 💧",
        options: [
          {
            id: 1,
            text: "Озеро Иссык-Куль",
            image: "/images/level1/lake.png",
            correct: true,
          },
          {
            id: 2,
            text: "Гора",
            image: "/images/level1/mountain.png",
            correct: false,
          },
          {
            id: 3,
            text: "Лес",
            image: "/images/level1/forest.png",
            correct: false,
          },
        ],
      },
      {
        id: 2,
        type: "image-choice",
        question: "Что построил хан?",
        hint: "Шумкар: Высокую башню 👀",
        options: [
          {
            id: 1,
            text: "Башню Бурана",
            image: "/images/level2/tower.png",
            correct: true,
          },
          {
            id: 2,
            text: "Замок",
            image: "/images/level2/castle.png",
            correct: false,
          },
          {
            id: 3,
            text: "Дом",
            image: "/images/level2/tree.png",
            correct: false,
          },
        ],
      },
      {
        id: 3,
        type: "image-choice",
        question: "Кто хотел забрать девушку?",
        hint: "Шумкар: Он был злым 😠",
        options: [
          {
            id: 1,
            text: "Друг",
            image: "/images/level1/friend.png",
            correct: false,
          },
          {
            id: 2,
            text: "Злой хан",
            image: "/images/level1/evil-khan.png",
            correct: true,
          },
          {
            id: 3,
            text: "Добрый хан",
            image: "/images/level1/good-khan.png",
            correct: false,
          },
        ],
      },
    ],

    sequenceHint:
      "Шумкар: Вспомни историю про девушку и озеро — это правильный порядок.",

    sequenceGame: [
      {
        id: 1,
        text: "Жила добрая девушка",
        image: "/images/level1/girl.png",
        order: 1,
      },
      {
        id: 2,
        text: "Злой хан захотел её забрать",
        image: "/images/level1/evil-khan.png",
        order: 2,
      },
      {
        id: 3,
        text: "Произошла трагедия",
        image: "/images/level1/tragedy.png",
        order: 3,
      },
      {
        id: 4,
        text: "Появилось озеро Иссык-Куль",
        image: "/images/level1/lake.png",
        order: 4,
      },
    ],
  },
};