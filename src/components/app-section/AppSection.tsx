import type { PropsWithChildren } from "react";
import styles from "./AppSection.module.css";

type AppSectionProps = PropsWithChildren<{
  title: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
}>;

export const AppSection = ({ title, icon, isLoading, children }: AppSectionProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <span>
          {icon && icon}
          {title}
        </span>
      </h2>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.content}>{children}</div>
      )}
    </section>
  );
};
