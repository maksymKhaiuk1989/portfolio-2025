import { NAV_ITEMS } from "@/constants/nav-items";
import { appStore } from "@/stores/appStore";
import { autorun } from "mobx";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export const useHeaderMask = (
  containerRef: RefObject<HTMLDivElement | null>
) => {
  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({});

  const sections = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const clamp = (v: number) => Math.max(0, Math.min(100, v));

    const updateMask = () => {
      const activeIndex = NAV_ITEMS.indexOf(appStore.currentSection);
      const el = sections.current[activeIndex];
      const container = containerRef.current;

      if (el && container) {
        const elRect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const left =
          ((elRect.left - containerRect.left) / containerRect.width) * 100;
        const width = (elRect.width / containerRect.width) * 100;
        const extraWidthPercent = 1.2;

        const newMask = {
          maskImage: `linear-gradient(
          to right,
          black 0%,
          black ${clamp(left - extraWidthPercent)}%,
          transparent ${clamp(left - extraWidthPercent)}%,
          transparent ${clamp(left + width + extraWidthPercent)}%,
          black ${clamp(left + width + extraWidthPercent)}%,
          black 100%
        )`,
          WebkitMaskImage: `linear-gradient(
          to right,
          black 0%,
          black ${clamp(left - extraWidthPercent)}%,
          transparent ${clamp(left - extraWidthPercent)}%,
          transparent ${clamp(left + width + extraWidthPercent)}%,
          black ${clamp(left + width + extraWidthPercent)}%,
          black 100%
        )`,
        };

        setMaskStyle(newMask);
      }
    };

    const disposer = autorun(() => {
      updateMask();
    });

    window.addEventListener("resize", updateMask);
    return () => {
      disposer();
      window.removeEventListener("resize", updateMask);
    };
  }, [containerRef]);

  const mask = useMemo(
    () => (
      <div
        className="absolute left-0 right-0 pointer-events-none border-shadow"
        style={maskStyle}
      />
    ),
    [maskStyle]
  );

  return {
    mask,
    sections,
  };
};
