"use client";
import { useState } from "react";
import { editUserById } from "../action";
import { EditUserSchema } from "../schema";
import { Button, Paper, Stack, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FloatingInput } from "@/global/components/common";
import { Action } from "@/global/classes";
import { useRouter } from "next/navigation";
import { useNotification } from "@/global/hooks";
import { useToast } from "@/global/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { userRoute } from "@/global/constants/routes";

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
      const response = await editUserById(user.id, values);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        router.push(userRoute(user.id));
      } else {
        const alert = { message: response.error, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
    } catch (error: any) {
      setStateUser(previousBook);
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleEditProfile)}>
      <Paper radius="md" p="lg">
        <Stack gap="xs" w={400}>
          <Text>Optimistic firstname: {stateUser.firstname}</Text>
          <Text>Original firstname: {user.firstname}</Text>

          <FloatingInput
            name="firstname"
            label="Firstname"
            key={form.key("firstname")}
            {...form.getInputProps("firstname")}
          />

          <FloatingInput
            name="lastname"
            label="Lastname"
            key={form.key("lastname")}
            {...form.getInputProps("lastname")}
          />

          <Button type="submit">{isMutating ? "Updating..." : "Update"}</Button>
        </Stack>
      </Paper>
    </form>
  );
}
