"use client";
import { IconBulb } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

export default function ThemeButton() {
  const { isMobile } = useSelector((state: RootState) => state.global);
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon onClick={toggleColorScheme} size={isMobile ? "md" : "input-sm"}>
      <IconBulb size={16} />
    </ActionIcon>
  );
}
