import type { AppDispatch } from "../../../app/store/store";
import { addTumars, addXp, increaseStreak, loseLife } from "../../../entities/player/playerSlice";

export const giveImageChoiceReward = (
  dispatch: AppDispatch,
  rewardMultiplier: number,
) => {
  dispatch(addXp(10 * rewardMultiplier));
  dispatch(addTumars(1 * rewardMultiplier));
  dispatch(increaseStreak());
};

export const giveSequenceReward = (
  dispatch: AppDispatch,
  rewardMultiplier: number,
) => {
  dispatch(addXp(30 * rewardMultiplier));
  dispatch(addTumars(3 * rewardMultiplier));
  dispatch(increaseStreak());
};

export const giveWrongAnswerPenalty = (dispatch: AppDispatch) => {
  dispatch(loseLife());
};
