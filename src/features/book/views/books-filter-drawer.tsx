"use client";
import { Suspense } from "react";
import { Genre } from "../enums";
import { Sort } from "../enums/sort";
import { Order } from "@/global/enums";
import { Drawer, Stack } from "@mantine/core";
import { drawerProps } from "@/global/constants";
import { UrlSelect, SelectSkeleton } from "@/global/components/common";

type BooksFilterDrawerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  title: string;
  opened: boolean;
  close: () => void;
};

export default function BooksFilterDrawer({
  size = "xs",
  title,
  close,
  opened,
}: BooksFilterDrawerProps) {
  const genreMap = new Map(Object.values(Genre).map((g) => [g, g]));
  const sortMap = new Map(Object.entries(Sort).map((s) => [s[1], s[0]]));
  const orderMap = new Map(Object.entries(Order).map((o) => [o[1], o[0]]));

  return (
    <Drawer
      size={size}
      zIndex={201}
      title={title}
      opened={opened}
      onClose={close}
      position="bottom"
      styles={drawerProps.styles}>
      <Stack gap="md" p="sm">
        <Suspense fallback={<SelectSkeleton />}>
          <UrlSelect paramKey="sort" options={sortMap} />
        </Suspense>

        <Suspense fallback={<SelectSkeleton />}>
          <UrlSelect paramKey="order" options={orderMap} />
        </Suspense>

        <Suspense fallback={<SelectSkeleton />}>
          <UrlSelect paramKey="genre" options={genreMap} />
        </Suspense>
      </Stack>
    </Drawer>
  );
}
