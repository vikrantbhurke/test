type LayoutProps = {
  children: React.ReactNode;
  auth: React.ReactNode;
};
export default function Layout({ children, auth }: LayoutProps) {
  return (
    <>
      {children}
      {auth}
    </>
  );
}
