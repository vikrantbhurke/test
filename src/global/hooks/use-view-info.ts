"use client";
import { useViewportSize } from "@mantine/hooks";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMobile } from "../states/global.slice";
import { useMantineTheme } from "@mantine/core";

export const useViewInfo = () => {
  const dispatch = useDispatch();
  const { width } = useViewportSize();
  const theme = useMantineTheme();

  useLayoutEffect(() => {
    if (width <= Number(theme.breakpoints.md.split("em")[0]) * 16)
      dispatch(setIsMobile(true));
    else dispatch(setIsMobile(false));
  }, [width, dispatch, theme]);
};
