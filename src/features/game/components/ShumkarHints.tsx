type Props = {
  text: string;
};

export const ShumkarHint = ({ text }: Props) => {
  return (
    <div className="flex items-start gap-3 bg-yellow-100 p-4 rounded-2xl mb-4 shadow">
      <img
        src="/images/shumkar.png"
        alt="Шумкар"
        className="w-14 h-14 object-contain"
      />
      <p className="text-lg font-medium">{text}</p>
    </div>
  );
};
