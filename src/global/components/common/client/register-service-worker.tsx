"use client";
import { useEffect } from "react";

export function RegisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("✅ SW registered:", reg))
          .catch((err) => console.error("⛔ SW registration failed:", err));
      });
    }
  }, []);

  return null;
}
