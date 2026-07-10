import { AppHeader } from "@/components/app-header/AppHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
