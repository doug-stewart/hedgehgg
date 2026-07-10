"use client";

import clsx from "clsx";
import Link from "next/link";
import { useId } from "react";
import HamburgerMenu from "@/assets/images/hamburger-menu.svg";
import { useSession } from "@/features/auth/hooks/useSession";
import { themes } from "../../helpers/themes";
import { useTheme } from "../../hooks/useTheme";
import styles from "./UserMenu.module.css";

export const UserMenu = ({ className }: { className?: string }) => {
  const id = useId();

  const { isLoggedIn, logout } = useSession();
  const { theme, setTheme } = useTheme();

  return isLoggedIn ? (
    <div className={clsx(styles.wrapper, className)}>
      <button
        className={styles.toggle}
        popoverTarget={id}
        popoverTargetAction="toggle"
        type="button"
      >
        <HamburgerMenu role="presentation" />
      </button>
      <dialog className={styles.menu} id={id} popover="auto">
        <ul>
          {themes.map((t) => (
            <button
              className={clsx(t.value === theme && styles.active)}
              key={t.value}
              onClick={() => setTheme.mutate(t.value)}
              type="button"
            >
              <t.icon title={t.label} />
            </button>
          ))}
        </ul>
        <Link href={"/settings"}>Settings</Link>
        <button onClick={logout} type="button">
          Logout
        </button>
      </dialog>
    </div>
  ) : null;
};
