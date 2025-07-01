"use client";
import { Avatar } from "@mantine/core";

export function AvatarNew({ auth }: any) {
  const { id, name, image } = auth;

  if (!auth) return <></>;
  if (id && !image) return <Avatar name={name} color="initials" size="sm" />;
  if (id && image) return <Avatar src={image} alt="Avatar" size="sm" />;
}
