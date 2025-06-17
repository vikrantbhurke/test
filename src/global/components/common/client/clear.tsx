"use client";
import { Role } from "@/features/user/enums";

type ClearProps = {
  role: Role;
  level: Role[];
  compOne: React.ReactNode;
  compTwo?: React.ReactNode;
};

export default function Clear({
  role = Role.Public,
  level,
  compOne,
  compTwo = null,
}: ClearProps) {
  if (role) {
    if (role === "Private") role = Role.Private;
    if (role === "Paid") role = Role.Paid;
    if (role === "Admin") role = Role.Admin;
    if (role === "Root") role = Role.Root;
  }

  return level.includes(role) ? compOne : compTwo;
}
