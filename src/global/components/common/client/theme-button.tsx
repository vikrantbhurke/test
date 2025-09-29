"use client";
import { IconBulb } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

export function ThemeButton() {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <ActionIcon
        onClick={toggleColorScheme}
        visibleFrom="sm"
        size="input-sm"
        aria-label="Toggle Theme">
        <IconBulb size={16} />
      </ActionIcon>

      <ActionIcon
        onClick={toggleColorScheme}
        hiddenFrom="sm"
        size="md"
        aria-label="Toggle Theme">
        <IconBulb size={16} />
      </ActionIcon>
    </>
  );
}
