"use client";
import { NAV_ITEMS } from "@/constants/nav-items";
import { useHeaderMask } from "@/hooks";
import { appStore } from "@/stores/appStore";
import { ClassNameProp } from "@/types";
import { observer } from "mobx-react-lite";
import { useRef } from "react";

export const Header = observer(({ className }: ClassNameProp) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mask, sections } = useHeaderMask(containerRef);

  return (
    <div
      className={`relative text-sm sm:text-2xl uppercase w-full ${className}`}
      ref={containerRef}
    >
      <nav className="flex justify-evenly gap-2 pb-1 relative z-10">
        {NAV_ITEMS.map((nav, i) => (
          <span
            key={nav}
            onClick={() => appStore.changeSection(nav)}
            ref={(el) => {
              sections.current[i] = el;
            }}
            className={`relative px-1 sm:px-2 cursor-pointer ${
              appStore.currentSection === nav
                ? "before-corner after-corner"
                : ""
            }`}
          >
            {nav}
          </span>
        ))}
      </nav>
      {mask}
    </div>
  );
});
