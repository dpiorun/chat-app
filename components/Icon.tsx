interface Props {
  Svg: any;
  className?: string;
}

export default function Icon({ Svg, ...props }: Props) {
  return (
    <Svg
      {...props}
      className={
        "fill-slate-200 group-hover:stroke-white group-hover:stroke-2 group-data-active:stroke-white group-data-active:stroke-2 " +
        props.className
      }
    />
  );
}
