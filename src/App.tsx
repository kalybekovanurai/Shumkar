import { useEffect } from "react";
import AppRouter from "./app/routes/AppRoutes";
import { useAppDispatch, useAppSelector } from "./app/store/hooks";
import { getProgressByUserId } from "./app/store/progress/progressThunk";

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const progressLevels = useAppSelector((state) => state.progress.levels);

  useEffect(() => {
    const hasProgress = Object.keys(progressLevels ?? {}).length > 0;

    if (user?.id && !hasProgress) {
      dispatch(getProgressByUserId(user.id));
    }
  }, [dispatch, user?.id, progressLevels]);

  return (
    <div className="min-h-screen bg-[#F2EEE5] flex flex-col">
      <AppRouter />
    </div>
  );
};


