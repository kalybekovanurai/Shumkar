const TUMAR_KEY = "tumar_score";
const LIVES_KEY = "lives";

export const getTumars = () => {
  return Number(localStorage.getItem(TUMAR_KEY)) || 0;
};

export const addTumars = (value: number) => {
  const current = getTumars();
  const updated = current + value;
  localStorage.setItem(TUMAR_KEY, String(updated));
  return updated;
};

export const getLives = () => {
  return Number(localStorage.getItem(LIVES_KEY)) || 3;
};

export const setLives = (value: number) => {
  localStorage.setItem(LIVES_KEY, String(value));
};

export const getProgress = () => {
  return JSON.parse(localStorage.getItem("progress") || "{}");
};

export const setProgress = (progress: any) => {
  localStorage.setItem("progress", JSON.stringify(progress));
};