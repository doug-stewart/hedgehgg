"use client";

import clsx from "clsx";
import { useId } from "react";
import HamburgerMenu from "@/assets/images/hamburger-menu.svg";
import { useSession } from "@/features/auth/hooks/useSession";
import { themes } from "../../helpers/themes";
import { useTheme } from "../../hooks/useTheme";
import { SettingsDialog } from "../settings-dialog/SettingsDialog";
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
        <SettingsDialog />
        <button onClick={logout} type="button">
          Logout
        </button>
      </dialog>
    </div>
  ) : null;
};
