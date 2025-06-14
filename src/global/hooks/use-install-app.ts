"use client";
import { useEffect, useState } from "react";

export const useInstallApp = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<any>(false);

  // Listen for the 'beforeinstallprompt' event to store the event.
  useEffect(() => {
    const handler = (event: any) => {
      event.preventDefault(); // Prevent the default prompt.
      setInstallPrompt(event); // Store the event for later use.
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Detect if the app is already installed.
  useEffect(() => {
    const handleInstalled = () => setIsInstalled(true);
    window.addEventListener("appinstalled", handleInstalled);

    return () => window.removeEventListener("appinstalled", handleInstalled);
  }, []);

  // Button click handler to show the install prompt.
  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt(); // Show the install prompt.
      const { outcome } = await installPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        setInstallPrompt(null); // Clear prompt after use.
      }
    }
  };

  return { installPrompt, isInstalled, handleInstallClick };
};
