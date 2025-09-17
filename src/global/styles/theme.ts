import {
  Text,
  Anchor,
  Button,
  Textarea,
  InputBase,
  TextInput,
  ActionIcon,
  Pagination,
  createTheme,
  PasswordInput,
  mergeThemeOverrides,
} from "@mantine/core";
import { colorsTheme } from "./colors.theme";
// import { inter } from "./fonts.style";

const input = {
  height: 50,
  borderRadius: 10,
  backgroundColor: "var(--bg-one)",
};

export const coreTheme = createTheme({
  // shadows: {
  //   sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
  //   md: "0 2px 4px rgba(0, 0, 0, 0.1)",
  //   lg: "0 4px 8px rgba(0, 0, 0, 0.1)",
  //   xl: "0 8px 16px rgba(0, 0, 0, 0.1)"
  //  },
  // focusClassName: "",
  // activeClassName: "",
  // defaultGradient: {},
  breakpoints: {
    xxs: "20em", // 360px
    xs: "30em", // 480px
    sm: "48em", // 768px
    md: "64em", // 1024px
    lg: "74em", // 1184px
    xl: "90em", // 1440px
    xxl: "120em", // 1920px
  },
  autoContrast: true,
  defaultRadius: "md",
  focusRing: "always",
  primaryShade: { light: 5, dark: 6 },
  fontFamily: "var(--font-inter)",
  components: {
    Text: Text.extend({
      defaultProps: {
        fz: "sm",
      },
    }),

    Button: Button.extend({
      defaultProps: {},
    }),

    Textarea: Textarea.extend({
      defaultProps: {
        styles: {
          input,
        },
      },
    }),

    InputBase: InputBase.extend({
      defaultProps: {
        styles: {
          input,
        },
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          input,
        },
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        styles: {
          input,
        },
      },
    }),

    Anchor: Anchor.extend({
      defaultProps: {
        fz: "sm",
        c: "var(--tx-one)",
      },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {
        size: "md",
        variant: "light",
        c: "var(--tx-one)",
      },
    }),

    Pagination: Pagination.extend({
      defaultProps: {
        size: "sm",
        m: "xs",
        siblings: 0,
      },

      styles: {
        control: {
          border: "none",
        },
      },
    }),
  },
});

export const theme = mergeThemeOverrides(coreTheme, colorsTheme);
