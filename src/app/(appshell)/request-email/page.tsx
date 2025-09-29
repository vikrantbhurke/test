import { RequestEmailForm } from "@/features/user/views/client";
import { dimensions } from "@/global/constants";
import { Stack } from "@mantine/core";
export { metadata } from "./metadata";

export default async function Page() {
  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        <RequestEmailForm />
      </Stack>
    </Stack>
  );
}
