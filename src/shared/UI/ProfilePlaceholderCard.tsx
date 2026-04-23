type Props = {
  title: string;
  text: string;
};

export const ProfilePlaceholderCard = ({ title, text }: Props) => {
  return (
    <section className="bg-white rounded-[28px] p-6 md:p-8 shadow-md border border-[#EFE7D8]">
      <h1 className="text-2xl md:text-3xl font-black text-[#1E2A44] mb-4">
        {title}
      </h1>

      <p className="text-[#6B7280] text-base leading-relaxed">{text}</p>
    </section>
  );
};
