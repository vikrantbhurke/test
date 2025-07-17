"use client";
import { ScrollButtons } from "./scroll-buttons";
import { ScrollWrapper } from "./scroll-wrapper";
import { ListGridInner } from "./list-grid-inner";
import { stillButtonProps } from "@/global/constants";
import { Text, Stack, Button, Group } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback, useIsFirstRender } from "@mantine/hooks";

type ScrollButtonsProps = {
  scrollRef?: React.RefObject<HTMLDivElement> | null;
  scrollProps?: object;
  scrollbar?: "window" | "container";
  scrollbuttons?: "top" | "bottom" | "both" | "none";
  positions?: object;
};

type ScrollWrapperProps = {
  offsetMobile: number;
  offsetDesktop: number;
  scrollRef?: React.RefObject<HTMLDivElement> | null;
};

type ListGridProps = {
  className?: string;
  p?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  gutter?: object | number;
};

type ListGridInnerProps = {
  content: any[];
  ad?: boolean;
  auth?: any | null;
  layout?: "grid" | "list";
  DataItem: React.FC<{ item: any }> | React.ComponentType<{ item: any }>;
  listGridProps?: ListGridProps;
};

type ListGridOuterProps = {
  more?: "button" | "scroll";
  endLabel?: string;
  buttonLabel?: string;
  endProps?: object;
  buttonProps?: any;
  initialDataPage: any;
  getDataArgs?: object;
  getData: (args: any, auth?: any) => Promise<any>;
  DataDetails?:
    | React.FC<{ dataPage?: any }>
    | React.ComponentType<{ dataPage?: any }>;
  scrollButtonsProps?: ScrollButtonsProps;
  scrollWrapperProps?: ScrollWrapperProps;
  listGridInnerProps?: ListGridInnerProps;
};

export function ListGridOuter({
  more = "button",
  endLabel = "Nothing more to load",
  buttonLabel = "Load More",
  endProps,
  buttonProps,
  initialDataPage,
  getDataArgs,
  getData,
  DataDetails = () => <></>,
  scrollButtonsProps,
  scrollWrapperProps,
  listGridInnerProps,
}: ListGridOuterProps) {
  const scrollRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const firstRender = useIsFirstRender();
  const [isFetching, setIsFetching] = useState(false);
  const [dataPage, setDataPage] = useState(initialDataPage);
  const [isLastPage, setIsLastPage] = useState(initialDataPage.lastPage);
  const [content, setContent] = useState<any[]>(initialDataPage.content);

  const auth = listGridInnerProps?.auth;
  const jsonDataArgs = JSON.stringify(getDataArgs);

  const loadMore = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const dataPage = await getData({ ...getDataArgs, page: page + 1 }, auth);
      setIsLastPage(dataPage.lastPage);
      setDataPage(dataPage);
      setPage((prevPage) => prevPage + 1);
      setContent((prevData) => [...prevData, ...dataPage.content]);
    } catch (error) {
      console.error("⛔ Error loading more data:", error);
    } finally {
      setIsFetching(false);
    }
  }, [auth, isFetching, getData, getDataArgs, page]);

  const loadNew = useDebouncedCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const dataPage = await getData({ ...getDataArgs, page: 0 }, auth);
      setIsLastPage(dataPage.lastPage);
      setPage(0);
      setDataPage(dataPage);
      setContent(dataPage.content);
    } catch (error) {
      console.error("⛔ Error loading new data:", error);
    } finally {
      setIsFetching(false);
    }
  }, 0);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 0.8; // 80% of the page height

      if (scrollButtonsProps?.scrollbar === "window") {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (
          !isLastPage &&
          more === "scroll" &&
          scrollTop + windowHeight >= threshold * docHeight
        ) {
          loadMore();
        }
      }

      if (scrollButtonsProps?.scrollbar === "container" && scrollRef?.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

        if (
          !isLastPage &&
          more === "scroll" &&
          scrollTop + clientHeight >= threshold * scrollHeight
        ) {
          loadMore();
        }
      }
    };

    const target =
      scrollButtonsProps?.scrollbar === "window" ? window : scrollRef?.current;

    target?.addEventListener("scroll", handleScroll);
    return () => target?.removeEventListener("scroll", handleScroll);
  }, [more, loadMore, scrollRef, isLastPage, scrollButtonsProps?.scrollbar]);

  useEffect(() => {
    if (firstRender) return;
    loadNew();
  }, [loadNew, firstRender, jsonDataArgs]);

  const listGridEnd = !isLastPage || (
    <Text ta="center" p="sm" {...endProps}>
      {endLabel}
    </Text>
  );

  const { justify, ...rest } = buttonProps;

  const loadMoreButton = !isLastPage ? (
    <Group justify={justify}>
      <Button
        {...rest}
        onClick={loadMore}
        aria-label={buttonLabel}
        disabled={isFetching}
        loading={isFetching}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}>
        {buttonLabel}
      </Button>
    </Group>
  ) : (
    listGridEnd
  );

  const footer = (
    <>
      {more == "scroll" && listGridEnd}
      {more == "button" && loadMoreButton}
    </>
  );

  return (
    <Stack h="100%" w="100%" gap={0}>
      <DataDetails dataPage={dataPage} />

      {scrollButtonsProps?.scrollbar === "window" ? (
        <>
          <ListGridInner props={{ ...listGridInnerProps, content }} />
          {footer}
          <ScrollButtons scrollButtonsProps={scrollButtonsProps} />
        </>
      ) : (
        <ScrollWrapper
          scrollWrapperProps={{ ...scrollWrapperProps, scrollRef }}
          scrollButtonsProps={scrollButtonsProps}>
          <ListGridInner props={{ ...listGridInnerProps, content }} />
          {footer}
        </ScrollWrapper>
      )}
    </Stack>
  );
}
