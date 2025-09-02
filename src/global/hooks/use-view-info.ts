"use client";
import { Screen } from "../enums";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { setScreen } from "../states/global-slice";

export const useViewInfo = () => {
  const dispatch = useDispatch();
  const { width } = useViewportSize();
  const theme = useMantineTheme();

  useLayoutEffect(() => {
    if (width <= Number(theme.breakpoints.sm.split("em")[0]) * 16)
      dispatch(setScreen(Screen.Mobile));
    else if (width <= Number(theme.breakpoints.md.split("em")[0]) * 16)
      dispatch(setScreen(Screen.Tablet));
    else if (width <= Number(theme.breakpoints.lg.split("em")[0]) * 16)
      dispatch(setScreen(Screen.Laptop));
    else if (width <= Number(theme.breakpoints.xxl.split("em")[0]) * 16)
      dispatch(setScreen(Screen.Desktop));
    else dispatch(setScreen(Screen.Television));
  }, [width, dispatch, theme]);
};
