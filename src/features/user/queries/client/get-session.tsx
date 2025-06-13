"use client";
import { Session } from "next-auth";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

type GetSessionProps = {
  children: (session: Session | null) => React.ReactNode;
};

export default function GetSession({ children }: GetSessionProps) {
  const { session } = useSelector((state: RootState) => state.global);
  return children(session);
}
