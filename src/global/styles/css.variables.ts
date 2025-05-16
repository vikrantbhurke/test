import { CSSVariablesResolver, darken, lighten } from "@mantine/core";

export const darkOne = "#09090B";
export const darkTwo = lighten("#09090B", 0.03);
export const darkThree = lighten("#09090B", 0.06);
export const darkFour = lighten("#09090B", 0.09);
export const darkFive = lighten("#09090B", 0.12);
export const darkBorder = lighten("#09090B", 0.1);
export const lightOne = "#FFFFFF";
export const lightTwo = darken("#F8FAFD", 0.05);
export const lightThree = darken("#F8FAFD", 0.08);
export const lightFour = darken("#F8FAFD", 0.11);
export const lightFive = darken("#F8FAFD", 0.14);
export const lightBorder = darken("#F8FAFD", 0.15);

export const resolveCssVariables: CSSVariablesResolver = () => cssVariables();

export const cssVariables = () => {
  return {
    variables: {},
    light: {
      "--tx-one": darkOne,
      "--bg-one": lightOne,
      "--tx-two": darkTwo,
      "--bg-two": lightTwo,
      "--tx-three": darkThree,
      "--bg-three": lightThree,
      "--tx-four": darkFour,
      "--bg-four": lightFour,
      "--tx-five": darkFive,
      "--bg-five": lightFive,
      "--border": lightBorder,
    },
    dark: {
      "--tx-one": lightOne,
      "--bg-one": darkOne,
      "--tx-two": lightTwo,
      "--bg-two": darkTwo,
      "--tx-three": lightThree,
      "--bg-three": darkThree,
      "--tx-four": lightFour,
      "--bg-four": darkFour,
      "--tx-five": lightFive,
      "--bg-five": darkFive,
      "--border": darkBorder,
    },
  };
};
