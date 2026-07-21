"use client";

import clsx from "clsx";
import { useId } from "react";
import HamburgerMenu from "@/assets/images/hamburger-menu.svg";
import { Button } from "@/components/button/Button";
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
      <Button
        className={styles.toggle}
        kind="secondary"
        popoverTarget={id}
        popoverTargetAction="toggle"
      >
        <HamburgerMenu role="presentation" />
      </Button>
      <dialog className={styles.menu} id={id} popover="auto">
        <p className={styles.title}>Select a theme:</p>
        <ul className={styles.themes}>
          {themes.map((t) => (
            <li key={t.value}>
              <button
                className={clsx(styles.theme, t.value === theme && styles.active)}
                onClick={() => setTheme.mutate(t.value)}
                type="button"
              >
                <t.icon title={t.label} />
              </button>
            </li>
          ))}
        </ul>
        <hr className={styles.divider} />
        <SettingsDialog buttonClassName={styles.btn} />
        <button className={styles.btn} onClick={logout} type="button">
          Logout
        </button>
      </dialog>
    </div>
  ) : null;
};
