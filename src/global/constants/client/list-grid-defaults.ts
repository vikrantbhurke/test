import { stillButtonProps } from "../still-button-props";

export const listGridDefaults = {
  buttonProps: {
    color: "var(--bg-two)",
    c: "var(--tx-one)",
    justify: "center",
    fullWidth: true,
    style: stillButtonProps.style,
    radius: 0,
    loaderProps: {
      type: "dots",
      color: "var(--tx-one)",
    } as const,
  },
  scrollButtonsProps: {
    scrollRef: null,
    scrollProps: {
      size: "md",
      radius: "xl",
      bg: "var(--bg-three)",
    },
    scrollbar: "window" as const,
    scrollbuttons: "both" as const,
    positions: {
      inner: 10,
      outer: 40,
    },
  },
  scrollWrapperProps: {
    offsetMobile: 180,
    offsetDesktop: 120,
    scrollRef: null,
  },
  listGridInnerProps: {
    listGridProps: {
      p: "xs" as const,
      gap: "xs" as const,
      layout: "grid" as const,
      gutter: { base: "xs", sm: "sm" } as const,
    },
  },
};
