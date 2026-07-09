"use client";

import clsx from "clsx";
import { Tooltip } from "../../../../components/tooltip/Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";
import type { InlineSVG } from "../../../../types";
import { useTheme } from "../../hooks/useTheme";
import type { ThemeValue } from "../../types";
import styles from "./ThemeOption.module.css";

type ThemeOptionProps = {
  value: ThemeValue;
  label: string;
  icon: InlineSVG;
};

export const ThemeOption = ({ value, label, icon }: ThemeOptionProps) => {
  const { theme, setTheme } = useTheme();
  const { tooltipRef, toggleTooltip } = useTooltip();

  const Icon = icon;

  const onSelect = (event: React.MouseEvent<HTMLInputElement>) => {
    setTheme.mutate(event.currentTarget.value as ThemeValue);
  };

  return (
    <label className={clsx(styles.option, theme === value && styles.selected)}>
      <Tooltip id={`theme-${value}`} ref={tooltipRef}>
        {label}
      </Tooltip>
      <Icon className={styles.icon} title={label} />
      <input
        className={styles.input}
        onClick={onSelect}
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
        popoverTarget={`theme-${value}`}
        popoverTargetAction="toggle"
        type="radio"
        value={value}
      />
    </label>
  );
};
