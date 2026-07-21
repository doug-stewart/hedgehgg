"use client";

import { useHotkey } from "@tanstack/react-hotkeys";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Hedgehgg from "@/assets/images/hedgehgg.svg";
import { UserMenu } from "@/features/user/components/user-menu/UserMenu";
import { applyTheme } from "@/features/user/helpers/themeStorage";
import { useTheme } from "@/features/user/hooks/useTheme";
import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  const { display, isLoaded } = useTheme();
  const queryClient = useQueryClient();

  useHotkey({ key: "r", shift: true }, () => {
    queryClient.invalidateQueries({ refetchType: "all" });
  });

  useEffect(() => {
    if (!isLoaded) return;
    applyTheme(display);
  }, [isLoaded, display]);

  return (
    <header className={styles.masthead}>
      <h1 className={styles.logo}>
        <Hedgehgg title="Hedgehgg" />
      </h1>
      <UserMenu className={styles.menu} />
    </header>
  );
};
