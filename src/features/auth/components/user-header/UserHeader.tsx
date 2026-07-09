"use client";

import Link from "next/link";
import { useEffect } from "react";
import Hedgehgg from "@/assets/images/hedgehgg.svg";
import { ThemeSelect } from "../../../user/components/theme-select/ThemeSelect";
import { useTheme } from "../../../user/hooks/useTheme";
import { useSession } from "../../hooks/useSession";
import styles from "./UserHeader.module.css";

export const UserHeader = () => {
  const { login, logout, signup, isLoggedIn } = useSession();
  const { display } = useTheme();

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", display);
  }, [display]);

  return (
    <header className={styles.masthead}>
      <h1 className={styles.logo}>
        <Hedgehgg title="Hedgehgg" />
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          {isLoggedIn ? (
            <>
              <li className={styles.item}>
                <Link className={styles.action} href="/nest">
                  Your Nest
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.action} href="/profile">
                  Settings
                </Link>
              </li>
              <li className={styles.item}>
                <button className={styles.action} onClick={logout} type="button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <button className={styles.action} onClick={() => signup("hi@dou.gg")} type="button">
                  Sign Up
                </button>
              </li>
              <li className={styles.item}>
                <button className={styles.action} onClick={login} type="button">
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ThemeSelect className={styles.theme} />
    </header>
  );
};
