export type ShopCategory = "help" | "bonus" | "style";

export type ShopItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: number;
  category: ShopCategory;
  skinKey?: string;
};

export const shopItems: ShopItem[] = [
  {
    id: 1,
    title: "Подсказка",
    description: "Поможет в трудном вопросе",
    icon: "🧩",
    price: 10,
    category: "help",
  },
  {
    id: 2,
    title: "Щит",
    description: "Одна ошибка без потери жизни",
    icon: "🛡️",
    price: 20,
    category: "help",
  },
  {
    id: 3,
    title: "+1 жизнь",
    description: "Продолжай играть дольше",
    icon: "❤️",
    price: 15,
    category: "bonus",
  },
];

export const tabLabels: Record<ShopCategory, string> = {
  help: "Помощь",
  bonus: "Бонусы",
  style: "Образы",
};
