"use client";
import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Page({ children }: any) {
  const router = useRouter();
  useEffect(() => {}, []);
  const handleBack = () => router.back();

  return (
    <Modal centered title="Modal" opened={true} onClose={handleBack} size="md">
      {children}
    </Modal>
  );
}
