"use client";

import clsx from "clsx";
import { useId } from "react";
import { themes } from "../../helpers/themes";
import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeSelect.module.css";

export const ThemeSelect = ({ className }: { className?: string }) => {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const activeTheme = themes.find((t) => t.value === theme);
  const Icon = activeTheme?.icon || (() => null);
  return (
    <div className={clsx(styles.theme, className)}>
      <button
        className={styles.toggle}
        popoverTarget={id}
        popoverTargetAction="toggle"
        title={activeTheme?.label ?? ""}
        type="button"
      >
        <Icon />
      </button>
      <dialog className={styles.picker} id={id} popover="auto">
        {themes.map((t) => (
          <button key={t.value} onClick={() => setTheme.mutate(t.value)} type="button">
            <t.icon title={t.label} />
          </button>
        ))}
      </dialog>
    </div>
  );
};
