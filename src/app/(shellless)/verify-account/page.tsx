import { VerifyAccount } from "@/features/user/views";
import { Stack } from "@mantine/core";

type PageProps = {
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const token = sp?.token;

  return (
    <Stack h="100vh" justify="center" align="center">
      {token && <VerifyAccount token={token} />}
    </Stack>
  );
}
