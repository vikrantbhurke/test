import { dimensions } from "./dimensions";

export const searchInputProps = {
  style: {
    top: 0,
    left: 0,
    zIndex: 1000,
    position: "absolute" as const,
    height: dimensions.headerHeight,
  },
  styles: {
    input: {
      height: dimensions.headerHeight,
      borderRadius: 0,
      borderTop: 0,
      borderRight: 0,
      borderLeft: 0,
      borderBottom: "1px solid var(--tx-one)",
      backgroundColor: "var(--bg-one)",
    },
  },
};
