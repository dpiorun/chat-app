export default function IconButton({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={
        "group flex aspect-square items-center justify-center shadow-sm shadow-slate-400 hover:cursor-pointer hover:bg-lavender-500 data-active:bg-lavender-500 " +
        props.className
      }
    >
      {children}
    </div>
  );
}
