import { Suspense } from "react";
import { getAuth } from "@/features";
import { Stack } from "@mantine/core";
import { redirect } from "next/navigation";
import { dimensions } from "@/global/constants";
import { signInRoute } from "@/global/constants/routes";
import { SaveBookForm } from "@/features/book/views/client";
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
