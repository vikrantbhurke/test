"use client";
import { Suspense } from "react";
import { Order } from "@/global/enums";
import { modalProps } from "@/global/constants";
import { Genre, Sort } from "@/features/book/enums";
import { Modal, Stack, Text } from "@mantine/core";
import { UrlSelect } from "@/global/components/common/client";

type BooksFilterModalProps = {
  title: string;
  opened: boolean;
  close: () => void;
};

export function BooksFilterModal({
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
      title={
        <Text size="sm" fw={700}>
          {title}
        </Text>
      }
      onClose={close}
      opened={opened}
      overlayProps={modalProps.overlayProps}>
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
    </Modal>
  );
}
