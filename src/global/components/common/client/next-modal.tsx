"use client";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";

type NextModalProps = {
  children: React.ReactNode;
  title?: string;
};

export default function NextModal({ children, title }: NextModalProps) {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <Modal centered title={title} opened={true} onClose={handleBack} size="md">
      {children}
    </Modal>
  );
}
