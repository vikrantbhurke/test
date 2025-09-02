"use client";
import { useSelector } from "react-redux";
import { ScrollArea } from "@mantine/core";
import { ScrollButtons } from "./scroll-buttons";
import { RootState } from "@/global/states/store";
import { Screen } from "@/global/enums";

export function ScrollWrapper({
  children,
  scrollButtonsProps,
  scrollWrapperProps,
}: any) {
  const { screen } = useSelector((state: RootState) => state.global);

  const h =
    screen === Screen.Mobile || screen === Screen.Tablet
      ? `calc(100vh - ${scrollWrapperProps.offsetMobile}px)`
      : `calc(100vh - ${scrollWrapperProps.offsetDesktop}px)`;

  return (
    <ScrollArea h={h} viewportRef={scrollWrapperProps.scrollRef}>
      {children}
      <ScrollButtons
        scrollButtonsProps={{
          ...scrollButtonsProps,
          scrollRef: scrollWrapperProps.scrollRef,
        }}
      />
    </ScrollArea>
  );
}
