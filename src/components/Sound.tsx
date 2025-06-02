"use client";

import { soundStore } from "@/stores/soundStore";
import { useEffect } from "react";

export const Sound = () => {
  useEffect(() => {
    soundStore.init();
  }, []);
  return null;
};
