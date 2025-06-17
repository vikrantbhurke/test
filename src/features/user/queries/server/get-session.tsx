import { auth } from "@/auth";
import { Session } from "next-auth";

type GetSessionProps = {
  children: (session: Session | null) => React.ReactNode;
};

export default async function GetSession({ children }: GetSessionProps) {
  const session = await auth();
  console.log("GetSession", session);
  return children(session);
}
