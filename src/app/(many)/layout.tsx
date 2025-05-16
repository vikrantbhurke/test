import { AppMany } from "@/global/components/layouts";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <AppMany>{children}</AppMany>;
}
