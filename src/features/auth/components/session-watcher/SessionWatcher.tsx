"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "../../hooks/useSession";

export const SessionWatcher = () => {
  const { isLoggedIn, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && !isPending) {
      router.push("/nest");
    }
  }, [isLoggedIn, isPending, router]);

  return null;
};
