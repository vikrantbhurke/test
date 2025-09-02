export const listGridDefaults = {
  paginationProps: {
    withPages: true,
    withEdges: true,
    withControls: true,
    value: 1,
    total: 1,
    size: "xs" as const,
    footerHeight: 60,
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
    offsetMobile: 240,
    offsetDesktop: 180,
    scrollRef: null,
  },
  listGridInnerProps: {
    ad: false,
    layout: "list" as const,
    listGridProps: {
      p: 0 as const,
      gap: "xs" as const,
      gutter: { base: "xs", sm: "sm" } as const,
    },
  },
};
