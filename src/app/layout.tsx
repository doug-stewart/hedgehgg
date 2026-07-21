import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Providers from "@/components/providers/Providers";
import { NotificationsList } from "@/features/notifications/components/notifications-list/NotificationsList";
import { themeInitScript } from "@/features/user/helpers/themeStorage";
import "@/styles/reset.css";
import "@/styles/index.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hedge.gg",
  description: "Squeak",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={notoSans.variable} lang="en" suppressHydrationWarning>
      <body>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Static file to initialize user theme choice */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <Providers>
          <NotificationsList />
          {children}
        </Providers>
      </body>
    </html>
  );
}
