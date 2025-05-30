"use client";
import { useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export default function NProgress() {
  const pathname = usePathname();
  const [isPending] = useTransition();

  useEffect(() => {
    if (isPending) nprogress.start();
    else nprogress.complete();
  }, [isPending]);

  useEffect(() => nprogress.complete(), [pathname]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") nprogress.start();
      else if (document.visibilityState === "visible") nprogress.complete();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return <NavigationProgress />;
}
