"use client";
import { useEffect } from "react";
import { Session } from "next-auth";
import { useDispatch } from "react-redux";
import { getSession } from "@/features/user/action";
import { setSession } from "@/global/states/global.slice";

type SessionProviderProps = {
  session?: Session | null;
  children: React.ReactNode;
};

export default function SessionProvider({
  session,
  children,
}: SessionProviderProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      const response = await getSession();
      if (response && response.success)
        dispatch(setSession(response.data || null));
    };

    fetchSession();
  }, [session, dispatch]);

  return children;
}
