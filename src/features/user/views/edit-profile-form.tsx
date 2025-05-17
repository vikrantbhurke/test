"use client";
import { useState } from "react";
import { editUserById } from "../action";
import { EditUserSchema } from "../schema";
import { Button, Paper, Stack, useMantineColorScheme } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FloatingInput } from "@/global/components/common";
import { Action } from "@/global/classes";
import { useRouter } from "next/navigation";
import { useNotification } from "@/global/hooks";
import { useToast } from "@/global/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { viewUserRoute } from "@/global/constants/routes";
import { lightBgOneDarkBgTwo } from "@/global/constants/floating-input-props";

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
      const response = await editUserById(user.id, values);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        router.push(viewUserRoute(user.id));
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
      <Paper p="xl">
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

          <Button type="submit">{isMutating ? "Updating..." : "Update"}</Button>
        </Stack>
      </Paper>
    </form>
  );
}
