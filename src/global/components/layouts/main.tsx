import { Stack } from "@mantine/core";

export function Main({ children }: any) {
  return (
    <Stack h="100%" w="100%" gap={0} align="center" justify="center">
      {children}
    </Stack>
  );
}
