"use client";
import ScrollButtons from "./scroll-buttons";
import ScrollWrapper from "./scroll-wrapper";
import ListGridClient from "./list-grid-client";
import { Text, Stack, Button, Group } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { stillButtonProps } from "@/global/constants";
import { useDebouncedCallback, useIsFirstRender } from "@mantine/hooks";

type ScrollButtonsProps = {
  scrollRef?: React.RefObject<HTMLDivElement> | null;
  scrollProps?: object;
  scrollbar?: "window" | "container";
  scrollbuttons?: "top" | "bottom" | "both" | "none";
  topPosition?: object;
  bottomPosition?: object;
};

type ScrollWrapperProps = {
  offsetMobile: number;
  offsetDesktop: number;
  scrollRef?: React.RefObject<HTMLDivElement> | null;
};

type ListGridProps = {
  className?: string;
  layout?: "grid" | "list";
  p?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  gutter?: object;
};

type ListGridClientProps = {
  content: any[];
  DataItemClient: React.FC<{ item: any }> | React.ComponentType<{ item: any }>;
  listGridProps?: ListGridProps;
};

type ListGridInfiniteProps = {
  more?: "button" | "scroll";
  endLabel?: string;
  buttonLabel?: string;
  endProps?: object;
  buttonProps?: any;
  initialDataPage: any;
  getDataArgs?: object;
  getData: (args: any) => Promise<any>;
  DataDetailsClient?:
    | React.FC<{ dataPage?: any }>
    | React.ComponentType<{ dataPage?: any }>;
  scrollButtonsProps?: ScrollButtonsProps;
  scrollWrapperProps?: ScrollWrapperProps;
  listGridClientProps?: ListGridClientProps;
};

export default function ListGridInfinite({
  more = "button",
  endLabel = "Nothing more to load",
  buttonLabel = "Load More",
  endProps,
  buttonProps,
  initialDataPage,
  getDataArgs,
  getData,
  DataDetailsClient = () => <></>,
  scrollButtonsProps,
  scrollWrapperProps,
  listGridClientProps,
}: ListGridInfiniteProps) {
  const scrollRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const firstRender = useIsFirstRender();
  const jsonDataArgs = JSON.stringify(getDataArgs);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [dataPage, setDataPage] = useState(initialDataPage);
  const [content, setContent] = useState<any[]>(initialDataPage.content);

  const loadMore = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getData({ ...getDataArgs, page: page + 1 });
      if (response.data.lastPage) setHasMoreData(false);
      setDataPage(response.data);
      setPage((prevPage) => prevPage + 1);
      setContent((prevData) => [...prevData, ...response.data.content]);
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, getData, getDataArgs, page]);

  const loadNew = useDebouncedCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await getData({ ...getDataArgs, page: 0 });
      if (response.data.lastPage) setHasMoreData(false);
      else setHasMoreData(true);
      setPage(0);
      setDataPage(response.data);
      setContent(response.data.content);
    } catch (error) {
      console.error("Error loading new data:", error);
    } finally {
      setIsFetching(false);
    }
  }, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollButtonsProps?.scrollbar === "window") {
        if (
          hasMoreData &&
          more === "scroll" &&
          window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight
        ) {
          loadMore();
        }
      }

      if (scrollButtonsProps?.scrollbar === "container" && scrollRef?.current) {
        if (
          hasMoreData &&
          more === "scroll" &&
          scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
            scrollRef.current.scrollHeight
        ) {
          loadMore();
        }
      }
    };

    const target =
      scrollButtonsProps?.scrollbar === "window" ? window : scrollRef?.current;

    target?.addEventListener("scroll", handleScroll);
    return () => target?.removeEventListener("scroll", handleScroll);
  }, [hasMoreData, more, scrollButtonsProps?.scrollbar, scrollRef, loadMore]);

  useEffect(() => {
    if (firstRender) return;
    loadNew();
  }, [loadNew, firstRender, jsonDataArgs]);

  const listGridEnd = hasMoreData || (
    <Text ta="center" p="sm" {...endProps}>
      {endLabel}
    </Text>
  );

  const { justify, ...rest } = buttonProps;

  const loadMoreButton = hasMoreData ? (
    <Group justify={justify}>
      <Button
        {...rest}
        onClick={loadMore}
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
      <DataDetailsClient dataPage={dataPage} />

      {scrollButtonsProps?.scrollbar === "window" ? (
        <>
          <ListGridClient props={{ ...listGridClientProps, content }} />
          {footer}
          <ScrollButtons scrollButtonsProps={scrollButtonsProps} />
        </>
      ) : (
        <ScrollWrapper
          scrollWrapperProps={{ ...scrollWrapperProps, scrollRef }}
          scrollButtonsProps={scrollButtonsProps}>
          <ListGridClient props={{ ...listGridClientProps, content }} />
          {footer}
        </ScrollWrapper>
      )}
    </Stack>
  );
}
