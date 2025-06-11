import { ResetPassword } from "@/features/user/views";
import { dimensions } from "@/global/constants";
import { Loader, Paper, Stack } from "@mantine/core";

type PageProps = {
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const token = sp?.token;

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        {token ? (
          <Paper p="xl">
            <ResetPassword token={token} />
          </Paper>
        ) : (
          <Loader size="xl" color="var(--tx-one)" />
        )}
      </Stack>
    </Stack>
  );
}
