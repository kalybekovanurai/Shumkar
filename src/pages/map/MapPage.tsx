import background from "../../assets/images/bOzUT.jpg";
import { useMapPage } from "../../features/map/model/useMapPage";
import { MapPath } from "../../widgets/map-path/MapPath";

export const MapPage = () => {
  const { path, loading, error, progressLevels, handleClick } = useMapPage();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <p className="text-lg font-semibold text-[#2B5FBA]">
          Загрузка уровней...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100dvh-84px)] flex items-center justify-center bg-[#F7F3EA] px-4">
        <p className="text-center text-red-500 font-semibold">
          {typeof error === "string" ? error : "Ошибка загрузки карты"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-[calc(100dvh-84px)] bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(247,243,234,0.70), rgba(247,243,234,0.70)), url(${background})`,
        backgroundSize: "auto",
      }}
    >
      <MapPath
        path={path}
        progressLevels={progressLevels}
        onItemClick={handleClick}
      />
    </div>
  );
};
