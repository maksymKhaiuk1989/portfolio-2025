"use client";
import { BootLoader, MainLayout } from "@/components";
import { appStore } from "@/stores/appStore";
import { observer } from "mobx-react-lite";
import { AnimatePresence, motion } from "motion/react";

export const ScreenContent = observer(() => {
  const { isAppReady } = appStore;

  return (
    <div>
      <AnimatePresence initial={false} mode="popLayout">
        {!isAppReady ? (
          <motion.div
            variants={rollOut}
            key="boot"
            initial="initial"
            exit="exit"
          >
            <BootLoader />
          </motion.div>
        ) : (
          <motion.div
            variants={rollIn}
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

const rollOut = {
  initial: { y: "0vh", skew: "0deg", opacity: 1 },
  exit: {
    y: "-100vh",
    skew: "-35deg",
    scale: 0.6,
    opacity: 0.1,
    transition: {
      duration: 0.6,
      type: "tween",
    },
  },
};
const rollIn = {
  initial: {
    y: "100vh",
    opacity: 0,
    skew: "35deg",
    scale: 0.9,
  },
  animate: {
    y: "0vh",
    opacity: 1,
    skew: "0deg",
    scale: 1,
    transition: {
      duration: 0.9,
      type: "tween",
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};
