export const navbarAnimation = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.7,
      type: "spring",
      stiffness: 150,
    },
  },
};

export const fromLeft = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 1.2,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export const fromRight = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 1.2,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export const hiddenToVisible = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      duration: 1.2,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};
