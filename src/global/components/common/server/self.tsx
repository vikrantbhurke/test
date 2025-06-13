import { auth } from "@/auth";

type SelfProps = {
  id: string;
  children: React.ReactNode;
};

export default async function Self({ id, children }: SelfProps) {
  const session = await auth();
  if (!session) return null;
  if (session.user.id !== id) return null;
  if (session.user.id === id) return children;
}
