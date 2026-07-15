"use client";

import { usePinned } from "../../hooks/usePinned";
import { PinnedLink } from "../pinned-link/PinnedLink";
import styles from "./PinnedLinks.module.css";

export const PinnedLinks = () => {
  const { pinned } = usePinned();

  return (
    <ul className={styles.links}>
      {pinned.map((link) => (
        <PinnedLink key={link.id} link={link} />
      ))}
    </ul>
  );
};
