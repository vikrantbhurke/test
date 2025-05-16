import { AppOne } from "@/global/components/layouts";

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <AppOne>
      {children}
      {modal}
    </AppOne>
  );
}
