import { Text } from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="/modal">Open modal</Link>
      <Text>Homepage</Text>
    </>
  );
}
