import { UserItem } from "@/features/user/views";
import { GetUserById } from "@/features/user/queries";
import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <GetUserById params={params}>
        {(user) => <UserItem user={user} />}
      </GetUserById>
    </Stack>
  );
}
