"use client";

import { useEffect, useState } from "react";
import { wait } from "@/utils";
import { Typewriter } from "./Typewriter";
import { appStore } from "@/stores/appStore";
import { observer } from "mobx-react-lite";

type BootStep = {
  label: string;
  waitMs: number;
  isWaitStep?: boolean;
  isLast?: boolean;
};

export const BootLoader = observer(() => {
  const [steps, setSteps] = useState<BootStep[]>([]);

  const boot = async () => {
    await wait(200);

    for (const step of BOOT_STEPS) {
      setSteps((prev) => [...prev, step]);

      if (step.isWaitStep) {
        while (!appStore.assetsLoaded) {
          await wait(100);
        }
      }

      await wait(step.waitMs);
    }

    await wait(WAIT_AFTER_BOOT_MS);
    appStore.completeBoot();
  };

  useEffect(() => {
    appStore.preloadResources();
    boot();
  }, []);

  const handleTypewriterCursor = (step: BootStep) => {
    if ((step.isWaitStep && !appStore.assetsLoaded) || step.isLast) {
      return true;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {steps.map((step, i) => (
        <Typewriter
          key={step.label + i}
          text={step.label}
          isActive
          speed={5}
          completeDelay={150}
          alwaysShowCursor={handleTypewriterCursor(step)}
          className="text-left text-nowrap sm:text-2xl"
        />
      ))}
    </div>
  );
});

const WAIT_AFTER_BOOT_MS = 400;

export const BOOT_STEPS: BootStep[] = [
  {
    label: "*********** V8.9.07 ***********",
    waitMs: 250,
  },
  {
    label: "COPYRIGHT 2069 MAXCO(R)",
    waitMs: 250,
  },
  {
    label: "RBIOS-4.03.09.00 BH71 87HA-S",
    waitMs: 200,
  },
  {
    label: "LOADER V.0.1-U",
    waitMs: 250,
  },
  {
    label: "EXEC VERSION 41.10 X-B",
    waitMs: 250,
  },
  {
    label: "64K RAM SYSTEM",
    waitMs: 200,
  },
  {
    label: "34913 BYTES FREE",
    waitMs: 200,
  },

  {
    label: "L04DED R0M(1) [OK] STATUS CODE: 31-A",
    waitMs: 600,
  },
  {
    label: "ROOT (5A8-R)",
    waitMs: 400,
  },
  {
    label: "SECURITY PROTOCOL: ENC974-U",
    waitMs: 250,
  },
  {
    label: "LOADING USER MODULES...",
    waitMs: 600,
    isWaitStep: true,
  },
  {
    label: "BOOT COMPLETE",
    waitMs: 250,
  },
  {
    label: "*********************************",
    waitMs: 250,
  },
  {
    label: "\u200B",
    waitMs: 160,
  },
  {
    label: ">",
    waitMs: 0,
    isLast: true,
  },
];
