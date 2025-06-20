"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useToast } from "@/global/hooks";
import { Loader, Stack, Text } from "@mantine/core";
import { verifyAccount } from "@/features/user/action";
import { signInRoute } from "@/global/constants/routes";

type VerifyAccountProps = {
  token: string;
};

export default function VerifyAccount({ token }: VerifyAccountProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [isVerified, setIsVerified] = useState(false);
  const { isMobile } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    const handleVerify = async () => {
      if (isVerified) return;
      try {
        const message = await verifyAccount(token);
        const alert = { message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        router.push(signInRoute);
        setIsVerified(true);
      } catch (error: any) {
        const alert = { message: error.message, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
    };

    handleVerify();
  }, [isVerified, token, isMobile, router, showNotification, showToast]);

  return (
    <Stack gap="md" align="center">
      <Loader size="md" color="var(--tx-one)" />
      <Text>Verifying Account...</Text>
    </Stack>
  );
}
