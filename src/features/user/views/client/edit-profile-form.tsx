"use client";
import {
  Group,
  Paper,
  Stack,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import {
  cloudinarySignatureApiRoute,
  deleteAvatarApiRoute,
  viewUserRoute,
} from "@/global/constants/routes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { EditUserSchema } from "@/features/user/schema";
import { useRouter } from "next/navigation";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { CldUploadWidget } from "next-cloudinary";
import { useToast } from "@/global/hooks";
import { useForm, zodResolver } from "@mantine/form";
import { editAvatarById, editUserById } from "@/features/user/action";
import { FloatingInput } from "@/global/components/common/client";
import { lightBgOneDarkBgTwo } from "@/global/constants";
import ProfilePic from "./profile-pic";

type EditProfileFormProps = {
  user: any;
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [stateUser, setStateUser] = useState(user);
  const [isMutating, setIsMutating] = useState(false);
  const { isMobile } = useSelector((state: RootState) => state.global);
  const { colorScheme } = useMantineColorScheme();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      firstname: stateUser.firstname,
      lastname: stateUser.lastname,
    },
    validate: zodResolver(EditUserSchema),
  });

  const handleEditProfile = async (values: any) => {
    if (isMutating) return;
    setIsMutating(true);
    const previousBook = stateUser;
    setStateUser((prev: any) => ({ ...prev, ...values }));

    try {
      const message = await editUserById(user.id, values);
      const alert = { message, status: "success" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
      router.push(viewUserRoute(user.id));
    } catch (error: any) {
      setStateUser(previousBook);
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  const handleUpload = async (result: any) => {
    const info = result?.info;

    try {
      if (
        typeof info === "object" &&
        info !== null &&
        "secure_url" in info &&
        "public_id" in info
      ) {
        const message = await editAvatarById(
          user.id,
          info.secure_url,
          info.public_id
        );

        const alert = { message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);

        setStateUser((prev: any) => ({
          ...prev,
          avatar: { secureUrl: info.secure_url, publicId: info.public_id },
        }));

        router.refresh();
      }
    } catch (error: any) {
      const message = error.message || "Failed to upload image.";
      const alert = { message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    }
  };

  const handleDelete = async () => {
    if (!stateUser.avatar.publicId) return;

    try {
      const apiResponse = await fetch(deleteAvatarApiRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: stateUser.avatar.publicId }),
      });

      if (!apiResponse.ok) {
        const message = "Failed to delete image.";
        const alert = { message, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        return;
      }

      await editAvatarById(user.id, "", "");

      const alert = { message: "Avatar deleted.", status: "success" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);

      setStateUser((prev: any) => ({
        ...prev,
        avatar: {
          secureUrl: "",
          publicId: "",
        },
      }));

      router.refresh();
    } catch (error: any) {
      const message = error.message || "Failed to delete image.";
      const alert = { message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    }
  };

  return (
    <Paper p="xl">
      <Stack gap="md">
        <ProfilePic user={user} />

        {stateUser.provider === "credentials" && (
          <Group justify="center">
            <CldUploadWidget
              signatureEndpoint={cloudinarySignatureApiRoute}
              uploadPreset={undefined}
              onSuccess={handleUpload}
              options={{
                folder: "testapp/avatars",
                publicId: "vikrantbhurke",
              }}>
              {({ open, isLoading }) => {
                return (
                  <Button
                    onClick={() => open()}
                    disabled={isLoading}
                    aria-label="Upload Avatar">
                    Upload
                  </Button>
                );
              }}
            </CldUploadWidget>

            <Button
              disabled={!stateUser.avatar.secureUrl}
              onClick={handleDelete}
              aria-label="Delete Avatar"
              color="red">
              Delete
            </Button>
          </Group>
        )}

        <form onSubmit={form.onSubmit(handleEditProfile)}>
          <Stack gap="md">
            <FloatingInput
              styles={lightBgOneDarkBgTwo(colorScheme)}
              name="firstname"
              label="Firstname"
              key={form.key("firstname")}
              {...form.getInputProps("firstname")}
            />

            <FloatingInput
              styles={lightBgOneDarkBgTwo(colorScheme)}
              name="lastname"
              label="Lastname"
              key={form.key("lastname")}
              {...form.getInputProps("lastname")}
            />

            <Button
              type="submit"
              aria-label="Update Profile"
              disabled={isMutating}>
              {isMutating ? "Updating..." : "Update"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
