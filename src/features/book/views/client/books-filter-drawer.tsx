"use client";
import { Suspense } from "react";
import { Order } from "@/global/enums";
import { Genre } from "@/features/book/enums";
import { Sort } from "@/global/enums";
import { Drawer, Stack, Text } from "@mantine/core";
import { drawerProps } from "@/global/constants";
import { UrlSelect } from "@/global/components/common/client";

type BooksFilterDrawerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  title: string;
  radius?: number | "xs" | "sm" | "md" | "lg" | "xl" | "full";
  opened: boolean;
  close: () => void;
};

export function BooksFilterDrawer({
  size = "xs",
  title,
  radius,
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
      title={
        <Text size="sm" fw={700}>
          {title}
        </Text>
      }
      opened={opened}
      radius={radius}
      onClose={close}
      position="bottom"
      styles={drawerProps.styles}>
      <Stack gap="md" p="sm">
        <Suspense fallback={<></>}>
          <UrlSelect paramKey="sort" options={sortMap} label="Sort" />
        </Suspense>

        <Suspense fallback={<></>}>
          <UrlSelect paramKey="order" options={orderMap} label="Order" />
        </Suspense>

        <Suspense fallback={<></>}>
          <UrlSelect paramKey="genre" options={genreMap} label="Genre" />
        </Suspense>
      </Stack>
    </Drawer>
  );
}
