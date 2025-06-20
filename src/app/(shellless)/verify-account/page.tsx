import { VerifyAccount } from "@/features/user/views/client";
import { Stack } from "@mantine/core";

type PageProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <Stack h="100vh" justify="center" align="center">
      {sp.token && <VerifyAccount token={sp.token} />}
    </Stack>
  );
}
