import {
  Text,
  Paper,
  Anchor,
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
import classes from "@/global/styles/app.module.css";
// import { inter } from "./fonts.style";

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

    Textarea: Textarea.extend({
      defaultProps: {
        fz: "sm",
      },
    }),

    InputBase: InputBase.extend({
      defaultProps: {
        styles: {
          input: { backgroundColor: "var(--bg-one)" },
        },
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          input: { backgroundColor: "var(--bg-one)" },
        },
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        styles: {
          input: { backgroundColor: "var(--bg-one)" },
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

    Paper: Paper.extend({
      defaultProps: {
        shadow: "none",
        className: classes.shadow,
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
