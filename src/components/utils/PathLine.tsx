import Arrow from "./Arrow";

type Props = {
  fromX: number;
  toX: number;
};

const PathLine = ({ fromX, toX }: Props) => {
  let direction: "left" | "right";

  if (toX > fromX) {
    direction = "right"; // \
  } else {
    direction = "left"; // /
  }

  return (
    <div className="h-10 flex justify-center items-center">
      <Arrow direction={direction} />
    </div>
  );
};

export default PathLine;
