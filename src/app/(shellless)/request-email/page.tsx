import { RequestEmailForm } from "@/features/user/views/client";
import { dimensions } from "@/global/constants";
import { Paper, Stack } from "@mantine/core";

export default async function Page() {
  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        <Paper p="xl">
          <RequestEmailForm />
        </Paper>
      </Stack>
    </Stack>
  );
}
