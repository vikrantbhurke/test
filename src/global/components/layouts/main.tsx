import { Stack } from "@mantine/core";

export function Main({ children }: any) {
  return (
    <Stack gap={0} w="100%" h="100%" maw={576}>
      {children}
    </Stack>
  );
}
