import type { Metadata } from "next";
import Providers from "@/components/providers/Providers";
import { UserHeader } from "@/features/auth/components/user-header/UserHeader";
import "@/styles/reset.css";
import "@/styles/index.css";

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
          <UserHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
