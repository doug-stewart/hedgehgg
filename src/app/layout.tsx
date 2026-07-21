import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { cookies } from "next/headers";
import Providers from "@/components/providers/Providers";
import { NotificationsList } from "@/features/notifications/components/notifications-list/NotificationsList";
import { THEME_COOKIE } from "@/features/user/helpers/themeStorage";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stored = (await cookies()).get(THEME_COOKIE)?.value;
  const dataTheme = stored === "light" || stored === "dark" ? stored : undefined;

  return (
    <html className={notoSans.variable} data-theme={dataTheme} lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NotificationsList />
          {children}
        </Providers>
      </body>
    </html>
  );
}
