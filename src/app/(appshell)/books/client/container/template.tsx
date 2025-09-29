import { getAuth } from "@/features";
import { Header } from "@/global/components/layouts";
import { Group, Space, Text } from "@mantine/core";
import Link from "next/link";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id, role, name, image } = await getAuth();

  return (
    <>
      <Header auth={{ id, role, name, image }}>
        <Group justify="space-between" w="100%" p="sm">
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Text>Home</Text>
          </Link>
          <Text>Client Container</Text>
          <Space />
        </Group>
      </Header>

      {children}
    </>
  );
}
