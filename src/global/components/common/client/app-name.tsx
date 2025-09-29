"use client";
import { stillButtonProps } from "@/global/constants";
import { homeRoute } from "@/global/constants/routes";
import { Button, Group, Title } from "@mantine/core";
import { IconAppsFilled } from "@tabler/icons-react";
import Link from "next/link";

export function AppName() {
  return (
    <Group gap="xs">
      <Button
        p={0}
        c="var(--tx-one)"
        bg="transparent"
        aria-label="Test App"
        leftSection={<IconAppsFilled size={32} color="var(--tx-one)" />}
        href={homeRoute}
        component={Link}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}>
        <Title order={4} fw="bolder" hiddenFrom="sm">
          Test
        </Title>
        <Title order={2} fw="bolder" visibleFrom="sm">
          Test
        </Title>
      </Button>
    </Group>
  );
}
