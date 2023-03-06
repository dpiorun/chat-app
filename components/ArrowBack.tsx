import Arrow from "../public/arrow.svg";

export default function ArrowBack({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={
        "flex items-center px-5 hover:cursor-pointer " + props.className
      }
    >
      <Arrow className="text-xl" />
    </div>
  );
}
