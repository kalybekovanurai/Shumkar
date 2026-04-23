import happyShumkar from "../../assets/images/happyShumkar.png";

type Props = {
  skin: string;
};

export const ShopCurrentSkinCard = ({ skin }: Props) => {
  return (
    <div className="bg-[#F6EBCF]/95 rounded-[24px] border border-[#EBDDBB] p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={happyShumkar}
          alt="Шумкар"
          className="w-14 h-14 object-contain shrink-0"
        />
        <div>
          <p className="text-[#6B5B2E] font-bold text-base">Текущий образ</p>
          <p className="text-[#6B5B2E] text-sm mt-1">
            {skin === "default" && "Обычный Шумкар"}
            {skin === "nomad" && "Шумкар-кочевник"}
            {skin === "night" && "Ночной Шумкар"}
            {skin === "gold" && "Золотой Шумкар"}
          </p>
        </div>
      </div>
    </div>
  );
};
