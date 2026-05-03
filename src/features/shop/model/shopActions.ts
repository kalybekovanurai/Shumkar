import type { AppDispatch } from "../../../app/store";
import type { ShopItem } from "./shopData";

import {
  addHint,
  addLife,
  addShield,
  restoreStreak,
  setSkin,
  spendTumars,
} from "../../../entities/player/playerSlice";

type BuyResult = {
  success: boolean;
  title: string;
  text: string;
  mood: "happy" | "sad" | "hint";
};

export const buyShopItem = (
  item: ShopItem,
  tumars: number,
  dispatch: AppDispatch,
): BuyResult => {
  if (tumars < item.price) {
    return {
      success: false,
      title: "Недостаточно тумаров 😢",
      text: "Собери ещё немного тумаров и возвращайся в магазин.",
      mood: "sad",
    };
  }

  dispatch(spendTumars(item.price));

  switch (item.id) {
    case 1:
      dispatch(addHint());
      return {
        success: true,
        title: "Покупка успешна 🎉",
        text: "Ты получил подсказку 🧩",
        mood: "happy",
      };

    case 2:
      dispatch(addShield());
      return {
        success: true,
        title: "Покупка успешна 🎉",
        text: "Ты получил щит 🛡️",
        mood: "happy",
      };

    case 3:
      dispatch(addLife());
      return {
        success: true,
        title: "Покупка успешна 🎉",
        text: "Ты получил +1 жизнь ❤️",
        mood: "happy",
      };

    case 4:
      dispatch(restoreStreak());
      return {
        success: true,
        title: "Покупка успешна 🎉",
        text: "Твоя серия спасена 🔥",
        mood: "happy",
      };

    default:
      if (item.skinKey) {
        dispatch(setSkin(item.skinKey));
        return {
          success: true,
          title: "Покупка успешна 🎉",
          text: `Новый образ выбран: ${item.title}`,
          mood: "happy",
        };
      }

      return {
        success: false,
        title: "Ошибка",
        text: "Этот товар пока нельзя купить.",
        mood: "sad",
      };
  }
};
