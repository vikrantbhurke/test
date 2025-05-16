export const listGridFiniteDefaults = {
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
    topPosition: {
      right: 40,
      bottom: 20,
    },
    bottomPosition: {
      right: 10,
      bottom: 20,
    },
  },
  scrollWrapperProps: {
    offsetMobile: 240,
    offsetDesktop: 180,
    scrollRef: null,
  },
  listGridServerProps: {
    listGridProps: {
      py: "xs" as const,
      gap: "xs" as const,
      layout: "grid" as const,
      gutter: { base: "xs", sm: "sm" } as const,
    },
  },
};
