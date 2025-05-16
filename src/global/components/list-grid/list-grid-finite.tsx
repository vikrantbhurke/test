import { Stack } from "@mantine/core";
import ScrollButtons from "./scroll-buttons";
import ScrollWrapper from "./scroll-wrapper";
import ListGridServer from "./list-grid-server";
import { PaginationButtons } from "@/global/components/list-grid";

type PaginationProps = {
  withPages?: boolean;
  withEdges?: boolean;
  withControls?: boolean;
  value?: number;
  total?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  classNames?: object;
  footerHeight?: number;
};

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

type ListGridServerProps = {
  content: any[];
  DataItemServer: React.FC<{ item: any }> | React.ComponentType<{ item: any }>;
  listGridProps?: ListGridProps;
};

type ListGridFiniteProps = {
  dataPage: any;
  DataDetailsServer?:
    | React.FC<{ dataPage?: any }>
    | React.ComponentType<{ dataPage?: any }>;
  paginationProps?: PaginationProps;
  scrollButtonsProps?: ScrollButtonsProps;
  scrollWrapperProps?: ScrollWrapperProps;
  listGridServerProps?: ListGridServerProps;
};

export default function ListGridFinite({
  dataPage,
  DataDetailsServer = () => <></>,
  paginationProps,
  scrollButtonsProps,
  scrollWrapperProps,
  listGridServerProps,
}: ListGridFiniteProps) {
  return (
    <Stack h="100%" w="100%" gap={0}>
      <DataDetailsServer dataPage={dataPage} />

      {scrollButtonsProps?.scrollbar === "window" ? (
        <>
          <ListGridServer props={listGridServerProps} />
          <ScrollButtons scrollButtonsProps={scrollButtonsProps} />
        </>
      ) : (
        <ScrollWrapper
          scrollButtonsProps={scrollButtonsProps}
          scrollWrapperProps={scrollWrapperProps}>
          <ListGridServer props={listGridServerProps} />
        </ScrollWrapper>
      )}

      <PaginationButtons paginationProps={paginationProps} />
    </Stack>
  );
}
