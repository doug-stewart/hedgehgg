"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "../features/auth/hooks/useSession";

export const Home = () => {
  const { isLoggedIn, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && !isPending) {
      router.push("/nest");
    }
  }, [isLoggedIn, isPending, router]);

  return (
    <>
      <title>Hedge.gg</title>
      <h1>Home</h1>
    </>
  );
};
