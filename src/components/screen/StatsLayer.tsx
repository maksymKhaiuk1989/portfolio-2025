import { useFPS, useStopwatch } from "@/hooks";

export const StatsLayer = () => {
  const { time } = useStopwatch();
  const fps = useFPS();

  const className =
    "fixed text-[10px] left-0  w-full flex justify-between opacity-65 py-2 px-2 md:px-4 lg:px-10";

  return (
    <div className="">
      <div className={`top-[18px] ${className}`}>
        <span>[ SYSTEM: ONLINE ]</span>
        <p>[ PERFORMANCE: {fps} ]</p>
      </div>

      <div className={`bottom-[10px] ${className}`}>
        <span>[ SESSION ID: #3A1B2C ]</span>
        <span>[ UPTIME: {time} ]</span>
      </div>
    </div>
  );
};
