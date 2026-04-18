import type { Quiz } from "../types/quiz";

export const quizData: Record<number, Quiz> = {
  1: {
    id: 1,
    questions: [
      {
        id: 1,
        question: "Кто была девушка в истории?",
        answers: [
          { id: 1, text: "Злая волшебница", correct: false },
          { id: 2, text: "Добрая девушка", correct: true },
          { id: 3, text: "Королева", correct: false },
        ],
      },
      {
        id: 2,
        question: "Кто хотел забрать девушку?",
        answers: [
          { id: 1, text: "Добрый хан", correct: false },
          { id: 2, text: "Злой хан", correct: true },
          { id: 3, text: "Друг", correct: false },
        ],
      },
      {
        id: 3,
        question: "Что появилось в конце истории?",
        answers: [
          { id: 1, text: "Гора", correct: false },
          { id: 2, text: "Лес", correct: false },
          { id: 3, text: "Озеро", correct: true },
        ],
      },
    ],
  },

  2: {
    id: 2,
    questions: [
      {
        id: 1,
        question: "Что стояло среди степей в начале истории?",
        answers: [
          { id: 1, text: "Замок", correct: false },
          { id: 2, text: "Башня", correct: true },
          { id: 3, text: "Дерево", correct: false },
        ],
      },
      {
        id: 2,
        question: "Кем была девочка?",
        answers: [
          { id: 1, text: "Дочкой хана", correct: true },
          { id: 2, text: "Принцессой из другой страны", correct: false },
          { id: 3, text: "Обычной жительницей", correct: false },
        ],
      },
      {
        id: 3,
        question: "Что предсказал старец?",
        answers: [
          { id: 1, text: "Что она станет королевой", correct: false },
          { id: 2, text: "Что она уедет далеко", correct: false },
          { id: 3, text: "Что она умрёт в 16 лет", correct: true },
        ],
      },
      {
        id: 4,
        question: "Зачем хан построил башню?",
        answers: [
          { id: 1, text: "Чтобы жить там", correct: false },
          { id: 2, text: "Чтобы спрятать дочь от судьбы", correct: true },
          { id: 3, text: "Чтобы хранить сокровища", correct: false },
        ],
      },
      {
        id: 5,
        question: "Что стало причиной трагедии?",
        answers: [
          { id: 1, text: "Буря", correct: false },
          { id: 2, text: "Змея", correct: true },
          { id: 3, text: "Паук", correct: false },
        ],
      },
    ],
  },

  // BONUS
  101: {
    id: 101,
    questions: [
      {
        id: 1,
        question: "Кто была девушка в истории?",
        answers: [
          { id: 1, text: "Злая волшебница", correct: false },
          { id: 2, text: "Добрая девушка — дочь хана", correct: true },
          { id: 3, text: "Королева соседнего царства", correct: false },
        ],
      },
      {
        id: 2,
        question: "Что стояло среди степей в начале истории?",
        answers: [
          { id: 1, text: "Высокий замок", correct: false },
          { id: 2, text: "Одинокая башня", correct: true },
          { id: 3, text: "Древнее дерево", correct: false },
        ],
      },
      {
        id: 3,
        question: "Что предсказал старец дочери хана?",
        answers: [
          { id: 1, text: "Она станет великой правительницей", correct: false },
          { id: 2, text: "Она умрёт в 16 лет", correct: true },
          { id: 3, text: "Она выйдет замуж за чужеземца", correct: false },
        ],
      },
      {
        id: 4,
        question: "Зачем хан построил высокую башню?",
        answers: [
          { id: 1, text: "Чтобы жить там с семьёй", correct: false },
          {
            id: 2,
            text: "Чтобы спрятать дочь от предсказанной судьбы",
            correct: true,
          },
          { id: 3, text: "Чтобы наблюдать за врагами", correct: false },
        ],
      },
      {
        id: 5,
        question: "Что стало причиной трагедии девушки?",
        answers: [
          { id: 1, text: "Сильная буря", correct: false },
          { id: 2, text: "Укус змеи", correct: true },
          { id: 3, text: "Падение с башни", correct: false },
        ],
      },
      {
        id: 6,
        question: "Какой символ в истории означает силу и свободу?",
        answers: [
          { id: 1, text: "Орёл", correct: true },
          { id: 2, text: "Лиса", correct: false },
          { id: 3, text: "Волк", correct: false },
        ],
      },
      {
        id: 7,
        question: "Что появилось в конце истории на месте трагедии?",
        answers: [
          { id: 1, text: "Высокая гора", correct: false },
          { id: 2, text: "Густой лес", correct: false },
          { id: 3, text: "Чистое озеро", correct: true },
        ],
      },
    ],
  },
};
