"use client";

import { useHotkey } from "@tanstack/react-hotkeys";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Hedgehgg from "@/assets/images/hedgehgg.svg";
import { UserMenu } from "@/features/user/components/user-menu/UserMenu";
import { useTheme } from "@/features/user/hooks/useTheme";
import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  const { display } = useTheme();
  const queryClient = useQueryClient();

  useHotkey({ key: "r", shift: true }, () => {
    queryClient.invalidateQueries({ refetchType: "all" });
  });

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", display);
  }, [display]);

  return (
    <header className={styles.masthead}>
      <h1 className={styles.logo}>
        <Hedgehgg title="Hedgehgg" />
      </h1>
      <UserMenu className={styles.menu} />
    </header>
  );
};
