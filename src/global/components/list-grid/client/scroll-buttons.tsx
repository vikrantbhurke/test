"use client";
import { useCallback, useEffect, useState } from "react";
import { ActionIcon, Affix, Transition } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { useIsFirstRender, useMounted, useWindowScroll } from "@mantine/hooks";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { dimensions } from "@/global/constants";
import { Screen } from "@/global/enums";

// Currently ScrollButtons are not visible for ListGridFinite (Container) since useRef can't be used in RSC
// ScrollButtons are visible in ListGridFinite (Window) & ListGridInfinite (Window & Container)

export function ScrollButtons({ scrollButtonsProps }: any) {
  const firstRender = useIsFirstRender();

  const { scrollRef, scrollbar, scrollProps, scrollbuttons, positions } =
    scrollButtonsProps;

  const mounted = useMounted();
  const [scroll, scrollTo] = useWindowScroll();
  const { screen } = useSelector((state: RootState) => state.global);
  const [scrollTopPosition, setScrollTopPosition] = useState(0);

  const scrollToBottom = () => {
    if (scrollRef) {
      scrollRef.current!.scrollTo({
        top: scrollRef.current!.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = useCallback(() => {
    if (scrollRef) scrollRef.current!.scrollTo({ top: 0, behavior: "smooth" });
  }, [scrollRef]);

  useEffect(() => {
    const handleScroll = () =>
      setScrollTopPosition(scrollRef?.current?.scrollTop || 0);

    if (!scrollRef) return;
    const scrollElement = scrollRef.current;
    if (scrollElement) scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollElement)
        scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef]);

  const { inner, outer } = positions;
  const { footerHeight } = dimensions;

  const adjacent = {
    right: screen === Screen.Mobile || screen === Screen.Tablet ? inner : outer,
    bottom:
      screen === Screen.Mobile || screen === Screen.Tablet
        ? footerHeight + outer
        : inner,
  };

  const corner = {
    right: inner,
    bottom:
      screen === Screen.Mobile || screen === Screen.Tablet
        ? footerHeight + inner
        : inner,
  };

  const topMounted =
    scrollbar === "window" ? scroll.y > 0 : scrollTopPosition > 0;

  const handleTopClick = useCallback(() => {
    if (scrollbar === "window") scrollTo({ y: 0 });
    else scrollToTop();
  }, [scrollbar, scrollTo, scrollToTop]);

  const scrollToTopButton = (
    // If only top is visible, shift its position to corner
    <Affix position={scrollbuttons === "top" ? corner : adjacent}>
      <Transition transition="slide-up" mounted={topMounted}>
        {(transitionStyles: any) => (
          <ActionIcon
            {...scrollProps}
            aria-label="Scroll to top"
            style={transitionStyles}
            onClick={handleTopClick}>
            <IconArrowUp size={16} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );

  const bottomMounted =
    scrollbar === "window"
      ? scroll.y + window.innerHeight < document.body.scrollHeight
      : scrollTopPosition + window.innerHeight <
        (scrollRef?.current?.scrollHeight || 0);

  const handleBottomClick = () => {
    if (scrollbar === "window") scrollTo({ y: document.body.scrollHeight });
    else scrollToBottom();
  };

  const scrollToBottomButton = (
    <Affix position={corner}>
      <Transition transition="slide-up" mounted={bottomMounted}>
        {(transitionStyles: any) => (
          <ActionIcon
            {...scrollProps}
            aria-label="Scroll to bottom"
            style={transitionStyles}
            onClick={handleBottomClick}>
            <IconArrowDown size={16} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );

  // If first render, scroll to top
  // This is to ensure that the scroll position is reset when the component mounts
  useEffect(() => {
    if (firstRender) handleTopClick();
  }, [firstRender, handleTopClick]);

  if (!mounted) return null;
  if (scrollbuttons === "none") return null;
  if (scrollbuttons === "top") return scrollToTopButton;
  if (scrollbuttons === "bottom") return scrollToBottomButton;

  if (scrollbuttons === "both")
    return (
      <>
        {scrollToTopButton}
        {scrollToBottomButton}
      </>
    );
}
