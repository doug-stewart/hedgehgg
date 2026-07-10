"use client";

import { useEffect } from "react";
import Hedgehgg from "@/assets/images/hedgehgg.svg";
import { UserMenu } from "@/features/user/components/user-menu/UserMenu";
import { useTheme } from "@/features/user/hooks/useTheme";
import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  const { display } = useTheme();

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
