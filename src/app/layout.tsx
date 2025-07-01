import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "./globals.css";
import { inter } from "@/global/styles/fonts.style";
import { Providers } from "@/global/components/common/client";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
export { metadata } from "./metadata";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>

      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
