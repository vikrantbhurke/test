"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Stack } from "@mantine/core";
import { signUpUser } from "@/features/user/action";
import { FloatingInput } from "@/global/components/common";
import { useRouter } from "next/navigation";
import { useToast } from "@/global/hooks/use-toast";
import { useNotification } from "@/global/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { Action } from "@/global/classes";
import { homeRoute } from "@/global/constants/routes";

export default function SignInForm() {
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSignUpUser = async (values: any) => {
    try {
      if (isMutating) return;
      setIsMutating(true);
      const response = await signUpUser(values);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        router.push(homeRoute);
      } else {
        const alert = { message: response.error, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
    } catch (error: any) {
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSignUpUser)}>
      <Stack gap="md">
        <FloatingInput
          name="username"
          label="Username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />

        <FloatingInput
          name="password"
          label="Password"
          type="password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Button c="var(--bg-one)" color="var(--tx-one)" type="submit">
          Sign In User
        </Button>
      </Stack>
    </form>
  );
}
