import clsx from "clsx";
import styles from "./Tooltip.module.css";

type TooltipProps = {
  children: React.ReactNode;
  id: string;
  ref: React.Ref<HTMLSpanElement>;
  className?: string;
};

export const Tooltip = ({ children, id, ref, className }: TooltipProps) => {
  return (
    <span
      className={clsx(styles.tootlip, className)}
      id={id}
      popover="hint"
      ref={ref}
      role="tooltip"
    >
      {children}
      <span className={styles.arrow} />
    </span>
  );
};
