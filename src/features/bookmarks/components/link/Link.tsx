import type { Link as TLink } from "../../types";

import styles from "./Link.module.css";

type LinkProps = { link: TLink };

export const Link = ({ link }: LinkProps) => {
  const { id, url, name } = link;
  return (
    <li key={id}>
      <a className={styles.link} href={url} rel="noopener noreferrer">
        {name}
      </a>
    </li>
  );
};
