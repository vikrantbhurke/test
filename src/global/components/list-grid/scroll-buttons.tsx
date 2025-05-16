"use client";
import { useEffect, useState } from "react";
import { ActionIcon, Affix, Transition } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { useMounted, useWindowScroll } from "@mantine/hooks";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { dimensions } from "@/global/constants";

export default function ScrollButtons({ scrollButtonsProps }: any) {
  const {
    scrollRef,
    scrollbar,
    scrollProps,
    scrollbuttons,
    topPosition,
    bottomPosition,
  } = scrollButtonsProps;

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

  const tp = topPosition
    ? {
        ...topPosition,
        bottom: isMobile
          ? dimensions.footerHeight + topPosition.bottom
          : topPosition.bottom,
      }
    : {
        right: 55,
        bottom: isMobile ? dimensions.footerHeight + 20 : 20,
      };

  const bp = bottomPosition
    ? {
        ...bottomPosition,
        bottom: isMobile
          ? dimensions.footerHeight + bottomPosition.bottom
          : bottomPosition.bottom,
      }
    : { bottom: isMobile ? dimensions.footerHeight + 20 : 20, right: 20 };

  const topMounted =
    scrollbar === "window" ? scroll.y > 0 : scrollTopPosition > 0;

  const handleTopClick = () => {
    if (scrollbar === "window") scrollTo({ y: 0 });
    else scrollToTop();
  };

  const scrollToTopButton = (
    <Affix position={tp}>
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
    <Affix position={bp}>
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
