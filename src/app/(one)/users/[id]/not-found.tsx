import { homeRoute } from "@/global/constants/routes";
import { Text, Title, Button, Stack } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack gap="lg">
      <Stack gap="xs" align="center">
        <Title order={6}>User Not Found.</Title>
        <Text>Please try refreshing the page.</Text>
      </Stack>
      <Button component={Link} href={homeRoute}>
        Homepage
      </Button>
    </Stack>
  );
}
