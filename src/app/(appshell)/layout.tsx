import { Suspense } from "react";
import { getAuth } from "@/features";
import { App, Header, HomeHeader } from "@/global/components/layouts";
import { IconAppWindowFilled } from "@tabler/icons-react";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const auth = await getAuth();

  return (
    <Suspense fallback={<IconAppWindowFilled size={20} />}>
      <App auth={auth}>
        <Header auth={auth}>
          <HomeHeader auth={auth} />
        </Header>
        <>{children}</>
      </App>
    </Suspense>
  );
}
