"use client";
import { useEffect } from "react";
import { dimensions } from "@/global/constants";
import { Button, Stack, Title } from "@mantine/core";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => console.error(error), [error]);
  const handleClick = () => reset();

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        <Title order={6}>{error.message}</Title>
        <Button onClick={handleClick}>Try again</Button>
      </Stack>
    </Stack>
  );
}
