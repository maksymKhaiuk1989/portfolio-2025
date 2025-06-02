"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { CRTFilter } from "pixi-filters";

export const useCRTEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    (async () => {
      if (!containerRef.current) return;

      const app = new PIXI.Application();
      await app.init({
        backgroundAlpha: 0,
        resizeTo: window,
      });

      containerRef.current.appendChild(app.canvas);
      appRef.current = app;

      let renderTexture = PIXI.RenderTexture.create({
        width: app.screen.width,
        height: app.screen.height,
      });

      const overlay = new PIXI.Graphics();
      const overlaySprite = new PIXI.Sprite(renderTexture);
      app.stage.addChild(overlaySprite);

      const drawOverlay = (alpha = 0.1) => {
        overlay.clear();
        overlay.fill({ color: 0x000000, alpha });
        overlay.rect(0, 0, app.screen.width, app.screen.height);
        overlay.fill();

        const newTexture = PIXI.RenderTexture.create({
          width: app.screen.width,
          height: app.screen.height,
        });

        app.renderer.render({
          container: overlay,
          target: newTexture,
          clear: true,
        });

        overlaySprite.texture = newTexture;
        renderTexture = newTexture;
      };

      drawOverlay();

      const crtFilter = new CRTFilter({
        curvature: 1,
        lineWidth: 4,
        lineContrast: 0.5,
        noise: 0.1,
        noiseSize: 1,
        vignetting: 0.5,
        vignettingAlpha: 0.5,
        seed: 1,
      });

      app.stage.filters = [crtFilter];

      app.ticker.add((ticker) => {
        crtFilter.seed = Math.random();
        crtFilter.time += ticker.deltaTime;
      });

      const onResize = () => {
        drawOverlay();

        overlaySprite.width = app.screen.width;
        overlaySprite.height = app.screen.height;
      };

      app.renderer.on("resize", onResize);
    })();

    return () => {
      appRef.current?.destroy(true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-100"
    ></div>
  );
};
