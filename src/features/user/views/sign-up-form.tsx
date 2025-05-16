"use client";
import { useState } from "react";
import { Gender } from "../enums";
import { useForm } from "@mantine/form";
import { SignUpUserSchema } from "../schema";
import { Button, Stack } from "@mantine/core";
import { signUpUser } from "@/features/user/action";
import { zodResolver } from "mantine-form-zod-resolver";
import { FloatingInput, FormSelect } from "@/global/components/common";
import { Action } from "@/global/classes";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useNotification } from "@/global/hooks";
import { useToast } from "@/global/hooks/use-toast";
import { useRouter } from "next/navigation";
import { homeRoute } from "@/global/constants/routes";

export default function SignUpForm() {
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },

    validate: zodResolver(SignUpUserSchema),
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

  const genderMap = new Map(Object.entries(Gender).map((g) => [g[1], g[0]]));

  return (
    <form onSubmit={form.onSubmit(handleSignUpUser)}>
      <Stack gap="md">
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

        <FloatingInput
          name="email"
          label="Email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

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

        <FloatingInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
        />

        <FormSelect
          value="Male"
          name="gender"
          label="Gender"
          options={genderMap}
          {...form.getInputProps("gender")}
        />

        <Button c="var(--bg-one)" color="var(--tx-one)" type="submit">
          Sign Up User
        </Button>
      </Stack>
    </form>
  );
}
