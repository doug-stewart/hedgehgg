import { useState } from "react";
import { useSearchStore } from "../../../search/stores/search.store";
import type { Collection as TCollection } from "../../types";
import { Link } from "../link/Link";

import styles from "./Collection.module.css";

type CollectionProps = { collection: TCollection; limit?: number };

export const Collection = ({ collection, limit = 10 }: CollectionProps) => {
  const [expanded, setExpanded] = useState(false);
  const { id, name, links } = collection;
  const searchFilter = useSearchStore((state) => state.filter);
  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  const toggle = () => setExpanded((expanded) => !expanded);

  return (
    <li key={id}>
      <h3>{name}</h3>
      <ul className={styles.links}>
        {filteredLinks.slice(0, expanded ? filteredLinks.length : limit).map((link) => (
          <Link key={link.id} link={link} />
        ))}
      </ul>
      <button onClick={toggle} type="button">
        {expanded ? "collapse" : "expand"}
      </button>
    </li>
  );
};
