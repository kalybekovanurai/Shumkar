import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  shopItems,
  tabLabels,
  type ShopCategory,
  type ShopItem,
} from "../../features/shop/model/shopData";
import { PageBackgroundLayout } from "../../shared/ui/background/PageBackgroundLayout";
import { ShopInventoryCard } from "../../features/shop/ui/ShopInventoryCard";
import { ShopCurrentSkinCard } from "../../features/shop/ui/ShopCurrentSkinCard";
import { ResultModal } from "../../shared/ui/modals/ResultModal";
import { ShopItemCard } from "../../features/shop/ui/ShopItemCard";
import { buyShopItem } from "../../features/shop/model/shopActions";
import { Button } from "../../shared/ui/button/Button";

export const ShopPage = () => {
  const dispatch = useDispatch<AppDispatch>();

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

  const handleBuy = (item: ShopItem) => {
    const result = buyShopItem(item, tumars, dispatch);

    setModalTitle(result.title);
    setModalText(result.text);
    setModalMood(result.mood);
    setModalOpen(true);
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
