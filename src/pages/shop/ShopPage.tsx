import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { shopItems, tabLabels, type ShopCategory, type ShopItem } from "./shopData";
import { addHint, addLife, addShield, restoreStreak, setSkin, spendTumars } from "../../app/store/player/playerSlice";
import { PageBackgroundLayout } from "../../shared/UI/PageBackgroundLayout";
import { ShopInventoryCard } from "./ShopInventoryCard";
import { ShopCurrentSkinCard } from "./ShopCurrentSkinCard";
import { Button } from "../../shared/UI/Button";
import { ShopItemCard } from "./ShopItemCard";
import { ResultModal } from "../../shared/UI/modals/ResultModal";


export const ShopPage = () => {
  const dispatch = useDispatch();

  const { tumars, lives, hints, shields, skin } = useSelector(
    (state: RootState) => state.player,
  );

  const [activeTab, setActiveTab] = useState<ShopCategory>("help");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("Покупка");
  const [modalMood, setModalMood] = useState<"happy" | "sad" | "hint">("happy");

  const filteredItems = useMemo(
    () => shopItems.filter((item) => item.category === activeTab),
    [activeTab],
  );

  const openSuccess = (text: string) => {
    setModalTitle("Покупка успешна 🎉");
    setModalText(text);
    setModalMood("happy");
    setModalOpen(true);
  };

  const openError = (text: string) => {
    setModalTitle("Недостаточно тумаров 😢");
    setModalText(text);
    setModalMood("sad");
    setModalOpen(true);
  };

  const handleBuy = (item: ShopItem) => {
    if (tumars < item.price) {
      openError("Собери ещё немного тумаров и возвращайся в магазин.");
      return;
    }

    dispatch(spendTumars(item.price));

    switch (item.id) {
      case 1:
        dispatch(addHint());
        openSuccess("Ты получил подсказку 🧩");
        break;
      case 2:
        dispatch(addShield());
        openSuccess("Ты получил щит 🛡️");
        break;
      case 3:
        dispatch(addLife());
        openSuccess("Ты получил +1 жизнь ❤️");
        break;
      case 4:
        dispatch(restoreStreak());
        openSuccess("Твоя серия спасена 🔥");
        break;
      default:
        if (item.skinKey) {
          dispatch(setSkin(item.skinKey));
          openSuccess(`Новый образ выбран: ${item.title}`);
        }
        break;
    }
  };

  return (
    <PageBackgroundLayout contentClassName="max-w-5xl mx-auto">
      <h1 className="text-center text-3xl md:text-4xl font-black text-[#2B5FBA] mb-2">
        Магазин Шумкара
      </h1>

      <p className="text-center text-[#6B7280] text-sm md:text-base mb-6">
        Твои тумары:{" "}
        <span className="font-black text-[#D4A62A]">{tumars} 🪙</span>
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-5">
        <aside className="space-y-4">
          <ShopInventoryCard
            lives={lives}
            tumars={tumars}
            hints={hints}
            shields={shields}
          />
          <ShopCurrentSkinCard skin={skin} />
        </aside>

        <section>
          <div className="flex flex-wrap gap-3 mb-4">
            {(Object.keys(tabLabels) as ShopCategory[]).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "primary" : "secondary"}
                size="md"
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab]}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <ShopItemCard
                key={item.id}
                item={item}
                alreadyOwned={false}
                onBuy={handleBuy}
              />
            ))}
          </div>
        </section>
      </div>

      <ResultModal
        open={modalOpen}
        mood={modalMood}
        title={modalTitle}
        text={modalText}
        buttonText="Понятно"
        onClose={() => setModalOpen(false)}
      />
    </PageBackgroundLayout>
  );
};
