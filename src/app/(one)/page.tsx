import { Text } from "@mantine/core";
import { AutoSignOut } from "@/features/user/views/client";
import { GetSession } from "@/features/user/queries/server";

export default async function Page() {
  return (
    <>
      <GetSession>
        {(session) => {
          return <AutoSignOut session={session} />;
        }}
      </GetSession>

      <Text>Homepage</Text>
    </>
  );
}
