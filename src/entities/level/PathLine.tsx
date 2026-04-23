import Arrow from "./Arrow";



type Props = {
  direction: "left" | "right";
};

const PathLine = ({ direction }: Props) => {
  return (
    <div className="h-8 sm:h-10 md:h-18 flex justify-center items-center">
      <Arrow direction={direction} />
    </div>
  );
};

export default PathLine;
