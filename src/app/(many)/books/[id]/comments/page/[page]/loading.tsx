import { NewSkeleton } from "@/global/components/common/server";
import { dimensions } from "@/global/constants";
import { Stack } from "@mantine/core";

export default function Loading() {
  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawSm}>
      <NewSkeleton h={300} w="100%" a="pulse" v="rounded" r="xs" />
      <NewSkeleton h={40} w="100%" a="pulse" v="rounded" r="xs" />
      <NewSkeleton h={100} w="100%" a="pulse" v="rounded" r="xs" />
      <NewSkeleton h={100} w="100%" a="pulse" v="rounded" r="xs" />
      <NewSkeleton h={100} w="100%" a="pulse" v="rounded" r="xs" />
    </Stack>
  );
}
