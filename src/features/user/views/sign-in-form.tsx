"use client";
import { useState } from "react";
import { Provider } from "../enums";
import { useForm } from "@mantine/form";
import { Action } from "@/global/classes";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SignInUserSchema } from "../schema";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useToast } from "@/global/hooks/use-toast";
import { homeRoute } from "@/global/constants/routes";
import { zodResolver } from "mantine-form-zod-resolver";
import { FloatingInput } from "@/global/components/common";
import { Button, Divider, Stack, useMantineColorScheme } from "@mantine/core";
import { signInWithCreds, signInWithOAuth } from "@/features/user/action";
import { lightBgOneDarkBgTwo } from "@/global/constants/floating-input-props";
import { IconLogin } from "@tabler/icons-react";

export default function SignInForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { colorScheme } = useMantineColorScheme();
  const [isMutating, setIsMutating] = useState(false);
  const { isMobile } = useSelector((state: RootState) => state.global);

  const [provider, setProvider] = useState<Provider | null>(null);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: zodResolver(SignInUserSchema),
  });

  const handleSignInWithCreds = async (values: any) => {
    try {
      if (isMutating) return;
      setIsMutating(true);
      setProvider(Provider.credentials);
      const response = await signInWithCreds(values);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        router.replace(homeRoute);
        router.refresh();
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
      setProvider(null);
    }
  };

  const handleSignInWithOAuth = async (
    provider: "apple" | "github" | "google"
  ) => {
    try {
      if (isMutating) return;
      setIsMutating(true);
      setProvider(provider as Provider);
      await signInWithOAuth(provider);
    } catch (error: any) {
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
      setProvider(null);
    }
  };

  return (
    <Stack gap="md">
      <form onSubmit={form.onSubmit(handleSignInWithCreds)}>
        <Stack gap="md">
          <FloatingInput
            styles={lightBgOneDarkBgTwo(colorScheme)}
            name="username"
            label="Username"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />

          <FloatingInput
            styles={lightBgOneDarkBgTwo(colorScheme)}
            name="password"
            label="Password"
            type="password-input"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Button
            leftSection={<IconLogin size={20} />}
            c="var(--bg-one)"
            color="var(--tx-one)"
            type="submit"
            disabled={isMutating && provider === Provider.credentials}
            loading={isMutating && provider === Provider.credentials}
            loaderProps={{ type: "dots", color: "var(--bg-one)" }}>
            Sign In with Credentials
          </Button>
        </Stack>
      </form>

      <Divider label="Or" labelPosition="center" />

      <Button
        leftSection={<FcGoogle size={20} />}
        c="var(--bg-one)"
        color="var(--tx-one)"
        disabled={isMutating && provider === Provider.google}
        loading={isMutating && provider === Provider.google}
        loaderProps={{ type: "dots", color: "var(--bg-one)" }}
        onClick={() => handleSignInWithOAuth("google")}>
        Sign In with Google
      </Button>

      <Button
        leftSection={<FaGithub size={20} />}
        c="var(--bg-one)"
        color="var(--tx-one)"
        disabled={isMutating && provider === Provider.github}
        loading={isMutating && provider === Provider.github}
        loaderProps={{ type: "dots", color: "var(--bg-one)" }}
        onClick={() => handleSignInWithOAuth("github")}>
        Sign In with Github
      </Button>
    </Stack>
  );
}
