"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/global/hooks";
import { verifyAccount } from "@/features";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { Loader, Stack, Text } from "@mantine/core";
import { signInRoute } from "@/global/constants/routes";
import { Screen } from "@/global/enums";

type VerifyAccountProps = {
  token: string;
};

export function VerifyAccount({ token }: VerifyAccountProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [isVerified, setIsVerified] = useState(false);
  const { screen } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    const handleVerify = async () => {
      if (isVerified) return;
      const response = await verifyAccount(token);
      if (screen === Screen.Mobile || screen === Screen.Tablet)
        showToast(response);
      else showNotification(response);
      router.push(signInRoute);
      setIsVerified(true);
    };

    handleVerify();
  }, [isVerified, token, screen, router, showNotification, showToast]);

  return (
    <Stack gap="md" align="center">
      <Loader size="md" color="var(--tx-one)" />
      <Text>Verifying Account...</Text>
    </Stack>
  );
}
