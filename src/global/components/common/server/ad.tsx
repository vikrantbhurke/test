import { Paper, Stack } from "@mantine/core";

export function Ad() {
  return (
    <Paper p="xl" h="100%">
      <Stack align="center" justify="center" h="100%">
        <Stack h={200} w={200} bg="red"></Stack>
      </Stack>
    </Paper>
  );
}
