import type { Level } from "../../components/types/level";

export const splitRows = (path: (Level | "chest")[]) => {
  const rows: (Level | "chest")[][] = [];

  for (let i = 0; i < path.length; i += 4) {
    rows.push(path.slice(i, i + 4));
  }

  return rows;
};
