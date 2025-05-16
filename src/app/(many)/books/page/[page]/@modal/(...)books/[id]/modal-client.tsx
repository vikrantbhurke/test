"use client";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ModalClientProps = {
  children: React.ReactNode;
  title?: string;
};

export default function ModalClient({ children, title }: ModalClientProps) {
  const router = useRouter();
  useEffect(() => {}, []);
  const handleBack = () => router.back();

  return (
    <Modal centered title={title} opened={true} onClose={handleBack} size="md">
      {children}
    </Modal>
  );
}
