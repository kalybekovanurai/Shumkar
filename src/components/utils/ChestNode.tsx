import chest from "../../assets/icons/chest.png";

type Props = {
  onClick?: () => void;
};

const ChestNode = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="
        w-32 h-32 bg-white rounded-full flex items-center justify-center
        cursor-pointer
        hover:scale-110 hover:shadow-2xl
        active:scale-95
        transition
      "
    >
      <img src={chest} className="w-24" />
    </div>
  );
};

export default ChestNode;
