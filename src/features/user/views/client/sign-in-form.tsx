"use client";
import {
  Anchor,
  Button,
  Divider,
  Group,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
import { useToast } from "@/global/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconLogin } from "@tabler/icons-react";
import { Provider } from "@/features/user/enums";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { zodResolver } from "mantine-form-zod-resolver";
import { lightBgOneDarkBgTwo } from "@/global/constants";
import { SignInUserSchema } from "@/features/user/schema";
import { signInWithCreds, signInWithOAuth } from "@/features";
import { FloatingInput } from "@/global/components/common/client";
import { homeRoute, requestEmailRoute } from "@/global/constants/routes";

export function SignInForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { colorScheme } = useMantineColorScheme();
  const [isMutating, setIsMutating] = useState(false);
  const { isMobile } = useSelector((state: RootState) => state.global);
  const [provider, setProvider] = useState<Provider | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error === "AccessDenied") {
      const alert = {
        message: "Sign in with your original sign in method.",
        status: "error" as const,
      };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    }
  }, [isMobile, showNotification, showToast]);

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
      setProvider(Provider.Credentials);
      const message = await signInWithCreds(values);
      const alert = { message, status: "success" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
      router.replace(homeRoute);
      router.refresh();
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
    provider: "apple" | "github" | "google" | "linkedin" | "twitter"
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
      <Button href={homeRoute} component={Link} aria-label="Home">
        Home
      </Button>

      <form onSubmit={form.onSubmit(handleSignInWithCreds)}>
        <Stack gap="md">
          <FloatingInput
            styles={lightBgOneDarkBgTwo(colorScheme)}
            name="username"
            label="Username"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />

          <Stack gap={4}>
            <FloatingInput
              styles={lightBgOneDarkBgTwo(colorScheme)}
              name="password"
              label="Password"
              type="password-input"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Group justify="end">
              <Anchor
                component={Link}
                href={requestEmailRoute}
                c="blue"
                fz="xs">
                Forgot Password?
              </Anchor>
            </Group>
          </Stack>

          <Button
            leftSection={<IconLogin size={20} />}
            c="var(--bg-one)"
            color="var(--tx-one)"
            type="submit"
            aria-label="Credentials"
            disabled={isMutating && provider === Provider.Credentials}
            loading={isMutating && provider === Provider.Credentials}
            loaderProps={{ type: "dots", color: "var(--bg-one)" }}>
            Sign In
          </Button>
        </Stack>
      </form>

      <Divider label="Or" labelPosition="center" />

      <Button
        leftSection={<FcGoogle size={20} />}
        c="var(--bg-one)"
        color="var(--tx-one)"
        aria-label="Google"
        disabled={isMutating && provider === Provider.Google}
        loading={isMutating && provider === Provider.Google}
        loaderProps={{ type: "dots", color: "var(--bg-one)" }}
        onClick={() => handleSignInWithOAuth("google")}>
        Google
      </Button>

      <Button
        leftSection={<FaGithub size={20} />}
        c="var(--bg-one)"
        color="var(--tx-one)"
        aria-label="Github"
        disabled={isMutating && provider === Provider.Github}
        loading={isMutating && provider === Provider.Github}
        loaderProps={{ type: "dots", color: "var(--bg-one)" }}
        onClick={() => handleSignInWithOAuth("github")}>
        Github
      </Button>

      {/* <Button
        leftSection={<FaLinkedin size={20} />}
        c="var(--bg-one)"
        color="var(--tx-one)"
        disabled={isMutating && provider === Provider.linkedin}
        loading={isMutating && provider === Provider.linkedin}
        loaderProps={{ type: "dots", color: "var(--bg-one)" }}
        onClick={() => handleSignInWithOAuth("linkedin")}>
        Sign In with LinkedIn
      </Button> */}
    </Stack>
  );
}
