import { CRTLayer, FrameLayer, StatsLayer, LineLayer } from "@/components";
import { ChildrenProp } from "@/types";

export const Screen = ({ children }: ChildrenProp) => {
  return (
    <div className="fixed inset-0 flex overflow-hidden bg-grid bg-center screen-shadow-effect">
      <FrameLayer />
      <StatsLayer />
      <div className="relative z-0 max-w-[800px] px-4 py-20 m-auto w-full flex flex-col items-center justify-center glitch ">
        {children}
      </div>
      <div className="fixed inset-0 scanlines pointer-events-none" />
      <LineLayer />
      <CRTLayer />
      <div className="fixed inset-0 pointer-events-none z-100 vignette bg-[url(/assets/images/crt.png)] bg-no-repeat bg-size-[100%_100%]" />
    </div>
  );
};
