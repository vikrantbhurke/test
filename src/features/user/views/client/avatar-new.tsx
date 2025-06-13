"use client";
import { Avatar } from "@mantine/core";

export default function AvatarNew({ session }: any) {
  const id = session?.user?.id;
  const name = session?.user?.name || undefined;
  const image = session?.user?.image || undefined;

  if (!session) return <></>;
  if (id && !image) return <Avatar name={name} color="initials" size="sm" />;
  if (id && image) return <Avatar src={image} alt="Avatar" size="sm" />;
}
