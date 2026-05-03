import { ChestNode } from "../../entities/level/ui/ChestNode";
import { LevelNode } from "../../entities/level/ui/LevelNode";
import { PathLine } from "../../entities/level/ui/PathLine";
import { getArrowDirection, getOffsetClass } from "../../features/map/lib/mapHelpers";

type Props = {
  path: any[];
  progressLevels: Record<number, { unlocked?: boolean; completed?: boolean }>;
  onItemClick: (item: any) => void;
};

export const MapPath = ({ path, progressLevels, onItemClick }: Props) => {
  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto pt-8 sm:pt-10 md:pt-14 pb-24 px-4 flex flex-col items-center">
      {path.map((item, index) => {
        const isLast = index === path.length - 1;
        const offsetClass = getOffsetClass(index);
        const direction = getArrowDirection(index);

        return (
          <div key={index} className="flex flex-col items-center w-full">
            <div className={`transition-transform duration-300 ${offsetClass}`}>
              {item.type === "level" ? (
                <LevelNode
                  type={item.data.type}
                  id={item.data.id}
                  title={item.data.title}
                  unlocked={item.data.unlocked}
                  completed={item.data.completed}
                  onClick={() => onItemClick(item)}
                />
              ) : (
                <ChestNode
                  onClick={() => onItemClick(item)}
                  unlocked={progressLevels[item.quizId]?.unlocked ?? false}
                  completed={progressLevels[item.quizId]?.completed ?? false}
                />
              )}
            </div>

            {!isLast && <PathLine direction={direction} />}
          </div>
        );
      })}
    </div>
  );
};
