import type { ReactNode } from "react";
import background from "../../../assets/images/backgroundOthers.png";

type Props = {
  children: ReactNode;
  contentClassName?: string;
  overlayOpacityClassName?: string;
};

export const PageBackgroundLayout = ({
  children,
  contentClassName = "max-w-5xl mx-auto",
  overlayOpacityClassName = "bg-[#F7F3EA]/70",
}: Props) => {
  return (
    <div
      className="min-h-[calc(100dvh-84px)] bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className={`min-h-[calc(100dvh-84px)] ${overlayOpacityClassName}`}>
        <div className={`px-4 py-5 md:px-6 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
