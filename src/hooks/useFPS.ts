import { useEffect, useState } from "react";

export const useFPS = () => {
  const [fps, setFPS] = useState("--");

  useEffect(() => {
    let isMounted = true;
    let lastTime = 0;
    let frameCount = 0;
    let rafId: number;

    function updateFPS(time: number) {
      if (!isMounted) return;

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

    rafId = requestAnimationFrame(updateFPS);

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return fps;
};
