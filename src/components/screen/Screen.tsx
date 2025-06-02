import { FrameLayer, StatsLayer } from "@/components";
import { ChildrenProp } from "@/types";
import { useCRTEffect } from "@/hooks";

export const Screen = ({ children }: ChildrenProp) => {
  const crtEffect = useCRTEffect();

  return (
    <div className="fixed inset-0 overflow-hidden bg-grid bg-center screen-shadow-effect">
      <FrameLayer />
      <StatsLayer />
      <div className="relative w-full h-full glitch">
        <div className="relative z-0 w-full h-full flex flex-col items-center justify-center  ">
          {children}
        </div>
        <div className="fixed inset-0 scanlines pointer-events-none" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-30 vignette bg-[url(/assets/images/crt.png)] bg-no-repeat bg-size-[100%_100%]" />
      {crtEffect}
    </div>
  );
};
