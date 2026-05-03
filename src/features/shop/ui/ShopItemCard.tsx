import { Button } from "../../../shared/ui/button/Button";
import type { ShopItem } from "../model/shopData";

type Props = {
  item: ShopItem;
  alreadyOwned?: boolean;
  onBuy: (item: ShopItem) => void;
};

export const ShopItemCard = ({ item, alreadyOwned = false, onBuy }: Props) => {
  return (
    <div className="bg-white/95 rounded-[24px] shadow-md border border-[#EFE7D8] p-4 hover:shadow-lg transition">
      <div className="text-4xl mb-3">{item.icon}</div>

      <h2 className="font-black text-xl md:text-2xl text-[#1E2A44]">
        {item.title}
      </h2>

      <p className="text-[#6B7280] text-sm md:text-base mt-2 min-h-[44px]">
        {item.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xl md:text-2xl font-black text-[#2B5FBA] leading-none">
            {item.price}
          </p>
          <p className="text-[#D4A62A] font-bold text-sm mt-1">тумар 🪙</p>
        </div>

        <Button
          variant={alreadyOwned ? "secondary" : "primary"}
          size="md"
          onClick={() => onBuy(item)}
        >
          {alreadyOwned ? "Надеть" : "Купить"}
        </Button>
      </div>
    </div>
  );
};
