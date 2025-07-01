"use client";
import { Burger } from "@mantine/core";

type BurgerButtonProps = {
  opened: boolean;
  toggle: () => void;
};

export function BurgerButton({ opened, toggle }: BurgerButtonProps) {
  return <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />;
}
