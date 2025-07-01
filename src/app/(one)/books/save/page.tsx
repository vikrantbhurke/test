import { SaveBookForm } from "@/features/book/views/client";
import { getAuth } from "@/features";
import { dimensions } from "@/global/constants";
import { signInRoute } from "@/global/constants/routes";
import { Stack } from "@mantine/core";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export { metadata } from "./metadata";

export default async function Page() {
  const { id } = await getAuth();
  if (!id) redirect(signInRoute);

  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <Suspense fallback={<></>}>
        <SaveBookForm auth={{ id }} />
      </Suspense>
    </Stack>
  );
}
