"use client";

import { usePinnedLinks } from "../../hooks/usePinnedLinks";
import { PinnedLink } from "../pinned-link/PinnedLink";
import styles from "./PinnedLinks.module.css";

export const PinnedLinks = () => {
  const { pinned } = usePinnedLinks();

  return (
    <ul className={styles.links}>
      {pinned.map((link) => (
        <PinnedLink key={link.id} link={link} />
      ))}
    </ul>
  );
};
