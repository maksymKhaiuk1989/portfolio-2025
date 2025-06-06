export const GLITCH_VARIANT = {
  initial: { opacity: 1, skewX: 0 },
  animate: {
    opacity: [0.1, 0.4, 0.2, 1],
    skewX: [-3, 13, -14, 0],
    scaleY: [1, 1.1, 0.9, 1],
    transition: {
      duration: 0.45,
      type: "tween",
      times: [0.2, 0.3, 0.6, 0.8],
    },
  },
  exit: {
    opacity: [0.9, 0.2, 0.1, 0],
    scaleY: [1, 1.1, 0.8, 1.2],
    skewX: [0, -12, 16, 0],
    transition: {
      duration: 0.35,
      type: "tween",
      times: [0.1, 0.2, 0.55, 0.6],
    },
  },
};
