interface Props {
  src: string;
  size: "sm" | "md" | "lg";
}

export default function Avatar({ src, size }: Props) {
  const getClassName = () => {
    let retval = "rounded-full";
    switch (size) {
      case "sm":
        return retval + " h-12 w-12";
      case "md":
        return retval + " h-24 w-24";
      case "lg":
        return retval + " h-36 w-36";
      default:
        return retval;
    }
  };

  return (
    <div className="shrink-0">
      <img className={getClassName()} src={src} alt="" />
    </div>
  );
}
