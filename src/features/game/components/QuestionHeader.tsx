type Props = {
  title: string;
  subtitle: string;
  progressPercent?: number;
  progressText?: string;
};

export const QuestionHeader = ({
  title,
  subtitle,
  progressPercent,
  progressText,
}: Props) => {
  return (
    <div className="shrink-0 px-3 pt-2 pb-3 text-center">
      <h2 className="text-xl md:text-2xl font-black text-[#13233F] leading-snug">
        {title}
      </h2>

      <p className="mt-2 text-xs md:text-sm text-[#6B7280] leading-relaxed max-w-xl mx-auto">
        {subtitle}
      </p>

      {typeof progressPercent === "number" && (
        <div className="mt-4 max-w-lg mx-auto">
          <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-2 bg-[#2B5FBA] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {progressText && (
            <p className="mt-2 text-center text-xs md:text-sm text-[#6B7280]">
              {progressText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
