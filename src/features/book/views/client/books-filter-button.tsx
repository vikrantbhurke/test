"use client";
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";
import { BooksFilterModal } from "./books-filter-modal";
import { BooksFilterDrawer } from "./books-filter-drawer";

export function BooksFilterButton() {
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);

  return (
    <>
      <ActionIcon
        hiddenFrom="md"
        onClick={drawerOpen}
        aria-label="Filter Books">
        <IconFilter size={16} stroke={1.5} />
      </ActionIcon>

      <ActionIcon
        visibleFrom="md"
        onClick={modalOpen}
        size="input-sm"
        aria-label="Filter Books">
        <IconFilter size={16} stroke={1.5} />
      </ActionIcon>

      <BooksFilterModal
        title="Books Filter"
        opened={modalOpened}
        close={modalClose}
      />
      <BooksFilterDrawer
        title="Books Filter"
        opened={drawerOpened}
        close={drawerClose}
      />
    </>
  );
}
