"use client";
import { useEffect } from "react";
import { Button, Title, Stack } from "@mantine/core";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => console.error(error), [error]);
  const handleClick = () => reset();

  return (
    <Stack>
      <Title order={6}>{error.message}</Title>
      <Button onClick={handleClick} aria-label="Try Again">
        Try again
      </Button>
    </Stack>
  );
}
