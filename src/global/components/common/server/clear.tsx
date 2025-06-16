import { Role } from "@/features/user/enums";
import { Session } from "next-auth";

type ClearProps = {
  session?: Session | null;
  level: Role[];
  one: React.ReactNode;
  two?: React.ReactNode;
};

export default async function Clear({
  session,
  level,
  one,
  two = null,
}: ClearProps) {
  let role = Role.Public;

  if (session) {
    const r = session.user.role;
    if (r === "Private") role = Role.Private;
    if (r === "Paid") role = Role.Paid;
    if (r === "Admin") role = Role.Admin;
    if (r === "Root") role = Role.Root;
  }

  return level.includes(role) ? one : two;
}
