"use client";
import {
  Avatar,
  Center,
  Modal,
  Stack,
  Image as MantineImage,
} from "@mantine/core";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";

export function ProfilePic({ user }: any) {
  const [opened, { open, close }] = useDisclosure(false);

  const id = user.id;
  const name = user.firstname + " " + user.lastname;
  const image = user.avatar.secureUrl || undefined;

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Profile Picture">
        <Center>
          {user.avatar.image && (
            <MantineImage
              radius="md"
              component={Image}
              src={image}
              alt="Avatar"
              width={550}
              height={550}
            />
          )}
        </Center>
      </Modal>

      <Stack align="center">
        {!id && <Avatar src="" size="xl" />}
        {id && !image && <Avatar name={name} color="initials" size="xl" />}
        {id && image && (
          <Avatar
            onClick={open}
            src={image}
            alt="Avatar"
            size="xl"
            className="rounded-full"
          />
        )}
      </Stack>
    </>
  );
}
