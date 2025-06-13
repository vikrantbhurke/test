"use client";
import { useToast } from "@/global/hooks";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { useNotification } from "@/global/hooks";
import { useViewportSize } from "@mantine/hooks";
import { signInRoute } from "@/global/constants/routes";
import { pullProviderById, signOutUser } from "@/features/user/action";

export default function AutoSignOut({ session }: any) {
  const router = useRouter();
  const theme = useMantineTheme();
  const { showToast } = useToast();
  const { width } = useViewportSize();
  const [isFired, setIsFired] = useState(true);
  const { showNotification } = useNotification();

  const isMobile = width <= Number(theme.breakpoints.sm.split("em")[0]) * 16;

  useLayoutEffect(() => {
    const id = session ? session.user.id : null;
    const provider = session ? session.user.provider : [];

    const handleAutoSignOut = async () => {
      if (isFired) setIsFired(false);
      await pullProviderById(id, provider[1]);
      await signOutUser();

      const p = provider[0].charAt(0).toUpperCase() + provider[0].slice(1);

      const message = `Account ${
        p === "Credentials" ? "registered" : "associated"
      } with ${p} found. Sign in with ${p} instead.`;

      const alert = { message, status: "warning" as const, autoClose: 10000 };
      if (isMobile) showToast(alert);
      else showNotification(alert);
      router.replace(signInRoute);
    };

    if (width && isFired && provider.length === 2) handleAutoSignOut();
  }, [session, width, router, isFired, isMobile, showToast, showNotification]);

  return <></>;
}
