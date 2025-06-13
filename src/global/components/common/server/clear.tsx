import { auth } from "@/auth";
import { Role } from "@/features/user/enums";

type ClearProps = {
  level: Role[];
  one: React.ReactNode;
  two?: React.ReactNode;
};

export default async function Clear({ level, one, two = null }: ClearProps) {
  const session = await auth();
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
