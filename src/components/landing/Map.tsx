import background from "../../assets/images/bOzUT.jpg";
import LevelNode from "../utils/LevelNode";
import ChestNode from "../utils/ChestNode";
import PathLine from "../utils/PathLine";
import { buildPath, getOffset } from "../utils/mapHelpers";
import { useNavigate } from "react-router-dom";
import type { Module } from "../types/level";

import { useSelector } from "react-redux";
import type { RootState } from "../store";

type Props = {
  modules: Module[];
};

export const Map = ({ modules }: Props) => {
  const navigate = useNavigate();

  const progress = useSelector((state: RootState) => state.progress.levels);

  const updatedModules = modules.map((m) => ({
    ...m,
    levels: m.levels.map((lvl) => ({
      ...lvl,
      ...(progress[lvl.id] || {}),
    })),
  }));

  const path = buildPath(updatedModules);

  const handleClick = (item: any) => {
    // 🎯 обычный уровень
    if (item.type === "level") {
      const level = item.data;

      if (!level.unlocked) return;

      if (level.type === "quiz") {
        navigate(`/quiz/${level.id}`);
      } else {
        navigate(`/lesson/${level.id}`);
      }
    }

    // 🎁 сундук (бонус)
    if (item.type === "chest") {
      navigate(`/quiz/${item.quizId}`, {
        state: { isBonus: true },
      });
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-repeat bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "auto",
      }}
    >
      <div className="max-w-md mx-auto pt-16 pb-24 flex flex-col items-center gap-3">
        {path.map((item, index) => {
          const isLast = index === path.length - 1;

          const offset = getOffset(index);
          const nextOffset = getOffset(index + 1);

          return (
            <div key={index} className="flex flex-col items-center">
              {/* NODE */}
              <div style={{ transform: `translateX(${offset}px)` }}>
                {item.type === "level" ? (
                  <LevelNode
                    type={item.data.type}
                    id={item.data.id}
                    title={item.data.title}
                    unlocked={item.data.unlocked}
                    completed={item.data.completed}
                    onClick={() => handleClick(item)}
                  />
                ) : (
                  <ChestNode onClick={() => handleClick(item)} />
                )}
              </div>

              {/* Линия */}
              {!isLast && <PathLine fromX={offset} toX={nextOffset} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
