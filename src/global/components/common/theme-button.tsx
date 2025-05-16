"use client";
import { IconBulb } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

export default function ThemeButton() {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon onClick={toggleColorScheme}>
      <IconBulb size={16} />
    </ActionIcon>
  );
}
