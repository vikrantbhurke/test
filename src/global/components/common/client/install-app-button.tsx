"use client";
import { Text } from "@mantine/core";
import { useInstallApp } from "@/global/hooks";

export function InstallAppButton() {
  const { installPrompt, isInstalled, handleInstallClick } = useInstallApp();

  return (
    <>
      {!isInstalled && installPrompt && (
        <Text fz={20} hiddenFrom="sm" onClick={handleInstallClick}>
          📱
        </Text>
      )}
    </>
  );
}
