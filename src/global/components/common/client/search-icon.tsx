"use client";
import { useDispatch } from "react-redux";
import { ActionIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { toggleSearch } from "@/global/states/global.slice";

export default function SearchIcon() {
  const dispatch = useDispatch();
  const handleToggleSearch = () => dispatch(toggleSearch());

  return (
    <ActionIcon size="md" onClick={handleToggleSearch} hiddenFrom="sm">
      <IconSearch size={16} />
    </ActionIcon>
  );
}
