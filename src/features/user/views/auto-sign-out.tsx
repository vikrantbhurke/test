"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useNotification } from "@/global/hooks";
import { useToast } from "@/global/hooks/use-toast";
import { signInRoute } from "@/global/constants/routes";
import { pullProviderById, signOutUser } from "../action";
import { useViewportSize } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

export default function AutoSignOut({ user }: any) {
  const router = useRouter();
  const theme = useMantineTheme();
  const { showToast } = useToast();
  const { width } = useViewportSize();
  const [isFired, setIsFired] = useState(true);
  const { showNotification } = useNotification();

  const isMobile = width <= Number(theme.breakpoints.sm.split("em")[0]) * 16;

  const handleAutoSignOut = useCallback(async () => {
    if (isFired) setIsFired(false);
    await pullProviderById(user.id, user.provider[1]);
    await signOutUser();

    const provider =
      user.provider[0].charAt(0).toUpperCase() + user.provider[0].slice(1);

    const message = `Account ${
      provider === "Credentials" ? "registered" : "associated"
    } with ${provider} found. Sign in with ${provider} instead.`;

    const alert = { message, status: "warning" as const, autoClose: 10000 };
    if (isMobile) showToast(alert);
    else showNotification(alert);
    router.replace(signInRoute);
  }, [isFired, isMobile, user, router, showNotification, showToast]);

  useEffect(() => {
    if (width && isFired && user.provider.length === 2) handleAutoSignOut();
  }, [isFired, width, handleAutoSignOut, user.provider.length]);

  return <></>;
}
