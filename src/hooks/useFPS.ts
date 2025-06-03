'use client';
import { useEffect, useState } from "react";

export const useFPS = () => {
  const [fps, setFPS] = useState("--");
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    let lastTime = 0;
    let frameCount = 0;
    let rafId: number;

    function updateFPS(time: number) {
      if (lastTime === 0) {
        lastTime = time;
        rafId = requestAnimationFrame(updateFPS);
        return;
      }

      const delta = time - lastTime;
      frameCount++;

      if (delta > 1000) {
        const fpsValue = Math.round((frameCount * 1000) / delta).toString();
        setFPS(fpsValue);
        lastTime = time;
        frameCount = 0;
      }

      rafId = requestAnimationFrame(updateFPS);
    }

    if (isOn) {
      rafId = requestAnimationFrame(updateFPS);
    }

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isOn]);

  const toggleMeasureFPS = () => setIsOn(!isOn);

  return { fps, toggleMeasureFPS };
};
