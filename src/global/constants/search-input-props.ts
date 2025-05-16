import { dimensions } from "./dimensions";

export const searchInputProps = {
  style: { top: 0, left: 0, zIndex: 1000, position: "absolute" as const },
  styles: {
    input: {
      borderRadius: 0,
      borderTop: 0,
      borderRight: 0,
      borderLeft: 0,
      height: dimensions.headerHeight,
    },
  },
};
