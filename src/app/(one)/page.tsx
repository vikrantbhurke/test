import { auth } from "@/auth";
import { Text } from "@mantine/core";
import { AutoSignOut } from "@/features/user/views";

export default async function Page() {
  const session: any = await auth();
  const id = session?.user?.id || "";
  const provider = session?.user?.provider || [];

  return (
    <>
      <AutoSignOut user={{ id, provider }} />
      <Text>Homepage</Text>
    </>
  );
}
