"use client";
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";
import BooksFiltersModal from "./books-filter-modal";
import BooksFiltersDrawer from "./books-filter-drawer";

export default function BooksFilterButton() {
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);

  return (
    <>
      <ActionIcon
        hiddenFrom="sm"
        onClick={drawerOpen}
        aria-label="Filter Books">
        <IconFilter size={16} stroke={1.5} />
      </ActionIcon>

      <ActionIcon
        visibleFrom="sm"
        onClick={modalOpen}
        size="input-sm"
        aria-label="Filter Books">
        <IconFilter size={16} stroke={1.5} />
      </ActionIcon>

      <BooksFiltersModal
        title="Books Filter"
        opened={modalOpened}
        close={modalClose}
      />
      <BooksFiltersDrawer
        title="Books Filter"
        opened={drawerOpened}
        close={drawerClose}
      />
    </>
  );
}
