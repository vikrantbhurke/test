"use client";
import { modalProps } from "@/global/constants";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";

type NextModalProps = {
  children: React.ReactNode;
  title?: string;
};

export function NextModal({ children, title }: NextModalProps) {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <Modal
      overlayProps={modalProps.overlayProps}
      centered
      title={title}
      opened={true}
      onClose={handleBack}
      size="md">
      {children}
    </Modal>
  );
}
