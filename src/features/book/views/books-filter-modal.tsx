"use client";
import { Genre } from "../enums";
import { Suspense } from "react";
import { Sort } from "../enums/sort";
import { Modal, Stack } from "@mantine/core";
import { Order } from "@/global/enums";
import { modalProps } from "@/global/constants";
import { UrlSelect, SelectSkeleton } from "@/global/components/common";

type BooksFilterModalProps = {
  title: string;
  opened: boolean;
  close: () => void;
};

export default function BooksFilterModal({
  title,
  close,
  opened,
}: BooksFilterModalProps) {
  const genreMap = new Map(Object.values(Genre).map((g) => [g, g]));
  const sortMap = new Map(Object.entries(Sort).map((s) => [s[1], s[0]]));
  const orderMap = new Map(Object.entries(Order).map((o) => [o[1], o[0]]));

  return (
    <Modal
      centered
      title={title}
      onClose={close}
      opened={opened}
      overlayProps={modalProps.overlayProps}>
      <Stack gap="md" p="sm">
        <Suspense fallback={<SelectSkeleton />}>
          <UrlSelect paramKey="sort" options={sortMap} label="Sort" />
        </Suspense>

        <Suspense fallback={<SelectSkeleton />}>
          <UrlSelect paramKey="order" options={orderMap} label="Order" />
        </Suspense>

        <Suspense fallback={<SelectSkeleton />}>
          <UrlSelect paramKey="genre" options={genreMap} label="Genre" />
        </Suspense>
      </Stack>
    </Modal>
  );
}
