"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export default function NProgress() {
  const pathname = usePathname();

  useEffect(() => {
    nprogress.start();
    const timeout = setTimeout(() => nprogress.complete(), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return <NavigationProgress />;
}
