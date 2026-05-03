import { useAppDispatch } from "../../../app/store/hooks";
import { Button } from "../../../shared/ui/button/Button";
import { loginFakeUser } from "../../auth/authSlice";

export const ProfileEmptyState = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-[calc(100dvh-84px)] flex items-center justify-center px-4">
      <div className="bg-white rounded-[28px] shadow-xl px-8 py-8 text-center border border-[#EFE7D8] max-w-md w-full">
        <h2 className="text-2xl font-black text-[#1E2A44]">
          Пользователь не найден
        </h2>
        <p className="mt-3 text-[#6B7280]">
          Сейчас у нас используется один тестовый пользователь.
        </p>

        <Button
          variant="primary"
          size="lg"
          className="mt-6"
          onClick={() => dispatch(loginFakeUser())}
        >
          Войти как тестовый пользователь
        </Button>
      </div>
    </div>
  );
};
