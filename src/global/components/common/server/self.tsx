import { Session } from "next-auth";

type SelfProps = {
  id: string;
  session: Session | null;
  children: React.ReactNode;
};

export default async function Self({ session, id, children }: SelfProps) {
  if (!session) return null;
  if (session.user.id !== id) return null;
  if (session.user.id === id) return children;
}
