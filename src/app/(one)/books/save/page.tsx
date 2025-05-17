import { SaveBookForm } from "@/features/book/views";
import { dimensions } from "@/global/constants";
import { Stack } from "@mantine/core";
import { Suspense } from "react";

export default function Page() {
  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <Suspense fallback={<></>}>
        <SaveBookForm />
      </Suspense>
    </Stack>
  );
}
