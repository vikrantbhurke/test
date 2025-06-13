"use client";
import { useEffect, useState } from "react";
import { ActionIcon, Affix, Transition } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { useMounted, useWindowScroll } from "@mantine/hooks";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { dimensions } from "@/global/constants";

// Currently ScrollButtons are not visible for ListGridFinite (Container) since useRef can't be used in RSC
// ScrollButtons are visible in ListGridFinite (Window) & ListGridInfinite (Window & Container)

export default function ScrollButtons({ scrollButtonsProps }: any) {
  const { scrollRef, scrollbar, scrollProps, scrollbuttons, positions } =
    scrollButtonsProps;

  const mounted = useMounted();
  const [scroll, scrollTo] = useWindowScroll();
  const { isMobile } = useSelector((state: RootState) => state.global);
  const [scrollTopPosition, setScrollTopPosition] = useState(0);

  const scrollToBottom = () => {
    if (scrollRef) {
      scrollRef.current!.scrollTo({
        top: scrollRef.current!.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    if (scrollRef) scrollRef.current!.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  if (!mounted) return null;

  const { inner, outer } = positions;
  const { footerHeight } = dimensions;

  const adjacent = {
    right: isMobile ? inner : outer,
    bottom: isMobile ? footerHeight + outer : inner,
  };

  const corner = {
    right: inner,
    bottom: isMobile ? footerHeight + inner : inner,
  };

  const topMounted =
    scrollbar === "window" ? scroll.y > 0 : scrollTopPosition > 0;

  const handleTopClick = () => {
    if (scrollbar === "window") scrollTo({ y: 0 });
    else scrollToTop();
  };

  const scrollToTopButton = (
    // If only top is visible, shift its position to corner
    <Affix position={scrollbuttons === "top" ? corner : adjacent}>
      <Transition transition="slide-up" mounted={topMounted}>
        {(transitionStyles: any) => (
          <ActionIcon
            {...scrollProps}
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
            style={transitionStyles}
            onClick={handleBottomClick}>
            <IconArrowDown size={16} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );

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
