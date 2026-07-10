import type { Metadata } from "next";
import Providers from "@/components/providers/Providers";
import "@/styles/reset.css";
import "@/styles/index.css";
import { NotificationsList } from "@/features/notifications/components/notifications-list/NotificationsList";

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
    <html lang="en">
      <body>
        <Providers>
          <NotificationsList />
          {children}
        </Providers>
      </body>
    </html>
  );
}
