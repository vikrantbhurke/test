import { Stack } from "@mantine/core";
import { ListGridInner } from "./list-grid-inner";
import { ScrollButtons, ScrollWrapper } from "../client";
import { PaginationButtons } from "@/global/components/list-grid/client";

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
  ad?: boolean;
  content: any[];
  auth?: any | null;
  layout?: "grid" | "list";
  listGridProps?: ListGridProps;
  DataItem: React.FC<{ item: any }> | React.ComponentType<{ item: any }>;
};

type ListGridOuterProps = {
  dataPage: any;
  DataDetails?:
    | React.FC<{ dataPage?: any }>
    | React.ComponentType<{ dataPage?: any }>;
  paginationProps?: PaginationProps;
  scrollButtonsProps?: ScrollButtonsProps;
  scrollWrapperProps?: ScrollWrapperProps;
  listGridInnerProps?: ListGridInnerProps;
};

export function ListGridOuter({
  dataPage,
  DataDetails = () => <></>,
  paginationProps,
  scrollButtonsProps,
  scrollWrapperProps,
  listGridInnerProps,
}: ListGridOuterProps) {
  return (
    <Stack h="100%" w="100%" gap={0}>
      <DataDetails dataPage={dataPage} />

      {scrollButtonsProps?.scrollbar === "window" ? (
        <>
          <ListGridInner props={listGridInnerProps} />
          <ScrollButtons scrollButtonsProps={scrollButtonsProps} />
        </>
      ) : (
        <ScrollWrapper
          scrollButtonsProps={scrollButtonsProps}
          scrollWrapperProps={scrollWrapperProps}>
          <ListGridInner props={listGridInnerProps} />
        </ScrollWrapper>
      )}

      <PaginationButtons paginationProps={paginationProps} />
    </Stack>
  );
}
