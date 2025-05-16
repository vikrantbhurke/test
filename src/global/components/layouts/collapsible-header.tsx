"use client";
import { useEffect, useState } from "react";
import { dimensions } from "@/global/constants";
import { Box, Transition } from "@mantine/core";

export default function CollapsibleHeader({ Component }: any) {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowHeader(window.scrollY > 0);
    handleScroll(); // initialize on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Transition
      duration={300}
      mounted={showHeader}
      timingFunction="ease"
      transition="slide-down">
      {(styles) => (
        <Box
          style={{
            ...styles,
            top: 0,
            zIndex: 1000,
            left: "50%",
            width: "100%",
            position: "fixed",
            maxWidth: dimensions.mawLg,
            transform: "translateX(-50%)",
          }}>
          {Component}
        </Box>
      )}
    </Transition>
  );
}
