"use client";
import { BootLoader, MainLayout } from "@/components";
import { GLITCH_VARIANT } from "@/constants/motion-variants";
import { appStore } from "@/stores/appStore";
import { soundStore } from "@/stores/soundStore";
import { observer } from "mobx-react-lite";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

export const ScreenContent = observer(() => {
  const { isAppReady } = appStore;

  useEffect(() => {
    if (isAppReady) {
      soundStore.init();
      soundStore.playSound("glitch");
    }
  }, [isAppReady]);

  return (
    <div className={`${isAppReady && "roll-screen"}`}>
      <AnimatePresence initial={false} mode="wait">
        {!isAppReady ? (
          <motion.div
            variants={GLITCH_VARIANT}
            key="boot"
            initial="initial"
            exit="exit"
          >
            <BootLoader />
          </motion.div>
        ) : (
          <motion.div
            variants={GLITCH_VARIANT}
            key="content"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <MainLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
