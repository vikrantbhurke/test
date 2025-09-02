import { dimensions } from "./dimensions";

export const appShellProps = {
  header: { height: dimensions.headerHeight, offset: true },
  footer: {
    height: { base: dimensions.footerHeight, md: 0 },
  },
  aside: {
    width: dimensions.asideWidth,
    breakpoint: "sm",
    collapsed: { mobile: true },
  },
  navbar: (opened: boolean) => ({
    width: dimensions.navbarWidth,
    breakpoint: "sm",
    collapsed: { mobile: !opened },
  }),
};
