"use client";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";

type SelfProps = {
  id: string;
  children: React.ReactNode;
};

export default function Self({ id, children }: SelfProps) {
  const { session } = useSelector((state: RootState) => state.global);
  if (!session) return null;
  if (session.user.id !== id) return null;
  if (session.user.id === id) return children;
}
