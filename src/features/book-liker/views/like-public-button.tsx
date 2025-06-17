"use client";
import Link from "next/link";
import { stillButtonProps } from "@/global/constants";
import { signInRoute } from "@/global/constants/routes";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";

export default function LikePublicButton({ likes }: any) {
  return (
    <Group gap={0}>
      <ActionIcon
        c="crimson"
        variant="subtle"
        component={Link}
        href={signInRoute}
        aria-label="Like Book Public"
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}>
        <IconHeartFilled size={16} />
      </ActionIcon>

      <Text>{likes || "0"}</Text>
    </Group>
  );
}
