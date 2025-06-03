"use client";
import { useFPS, useStopwatch } from "@/hooks";
import { appStore } from "@/stores/appStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const StatsLayer = observer(() => {
  const { isAppReady } = appStore;
  const { time, start } = useStopwatch({ autoStart: false });
  const { fps, toggleMeasureFPS } = useFPS();

  useEffect(() => {
    if (isAppReady) {
      start();
      toggleMeasureFPS();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppReady]);

  const className =
    "fixed text-[10px] left-0  w-full flex justify-between opacity-65 py-2 px-2 md:px-4 lg:px-10";

  return (
    <div className="">
      <div className={`top-[18px] ${className}`}>
        <span>[ SYSTEM: {!isAppReady ? "INITIALIZING" : "ONLINE"} ]</span>
        <p>[ PERFORMANCE: {fps} ]</p>
      </div>

      <div className={`bottom-[10px] ${className}`}>
        <span>[ SESSION ID: {!isAppReady ? "NULL" : sessionId} ]</span>
        <span>[ UPTIME: {time} ]</span>
      </div>
    </div>
  );
});

const sessionId = `#${Math.floor(Math.random() * 9)}A${Math.floor(
  Math.random() * 9
)}B${Math.floor(Math.random() * 9)}C${Math.floor(Math.random() * 9)}D`;
