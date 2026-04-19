
type ShopItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
};

const items: ShopItem[] = [
  {
    id: 1,
    title: "🔥 Восстановление streak",
    description: "Верни свой прогресс и продолжи серию без потерь",
    icon: "🔥",
    price: "50 💎",
  },
  {
    id: 2,
    title: "💎 3-дневный премиум",
    description: "Получи бонус XP и доступ к эксклюзивным уровням",
    icon: "💎",
    price: "120 💎",
  },
  {
    id: 3,
    title: "🎨 Кастомизация профиля",
    description: "Аватар в стиле кочевника + уникальный фон",
    icon: "🎨",
    price: "80 💎",
  },
  {
    id: 4,
    title: "🧩 Подсказки",
    description: "Помощь в сложных уровнях без потери XP",
    icon: "🧩",
    price: "30 💎",
  },
];

export const ShopPage = () => {
  return (
    <div className="min-h-screen  px-6 py-10">
      <h1 className="text-3xl font-black text-[#2B5FBA] mb-8">🛒 Магазин</h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:scale-[1.03] transition flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl mb-2">{item.icon}</div>

              <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>

              <p className="text-gray-500 text-sm mt-2">{item.description}</p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="font-bold text-[#2B5FBA]">{item.price}</span>

              <button className="bg-[#2B5FBA] text-white px-4 py-2 rounded-lg hover:bg-[#1e4a9c] transition">
                Купить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
