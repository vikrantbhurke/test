import { AppOne } from "@/global/components/layouts";
import { Suspense } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<div>AppOne Loading...</div>}>
      <AppOne>{children}</AppOne>
    </Suspense>
  );
}
