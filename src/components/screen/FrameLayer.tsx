export const FrameLayer = () => {
  return (
    <>
      <div className="fixed inset-0 flex gap-24 justify-between h-full w-full text-lg/3 pointer-events-none">
        <span className="top-2 -tracking-[7px] absolute opacity-30 stripe bg height-[20px] ">
          {"|".repeat(800)}
        </span>
        <span className="absolute  -tracking-[7px] bottom-1 opacity-45">
          {"|".repeat(800)}
        </span>
      </div>
    </>
  );
};
