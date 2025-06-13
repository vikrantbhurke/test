import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { GetUserById } from "@/features/user/queries/server";
import { EditProfileForm } from "@/features/user/views/client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <GetUserById params={params}>
        {(user) => <EditProfileForm user={user} />}
      </GetUserById>
    </Stack>
  );
}
