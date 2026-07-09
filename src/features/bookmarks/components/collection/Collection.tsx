"use client";

import { useState } from "react";
import { useSearchStore } from "../../../search/stores/search.store";
import type { Collection as TCollection } from "../../types";
import { Link } from "../link/Link";

import styles from "./Collection.module.css";

type CollectionProps = { collection: TCollection; limit?: number };

export const Collection = ({ collection, limit = 10 }: CollectionProps) => {
  const { id, name, links } = collection;

  const [expanded, setExpanded] = useState(false);
  const filter = useSearchStore((state) => state.filter);
  const filtered = links.filter((link) => link.name.toLowerCase().includes(filter.toLowerCase()));

  const toggle = () => setExpanded((expanded) => !expanded);

  return (
    <li key={id}>
      <h3>{name}</h3>
      <ul className={styles.links}>
        {filtered.slice(0, expanded ? filtered.length : limit).map((link) => (
          <Link key={link.id} link={link} />
        ))}
      </ul>
      {filtered.length > limit && (
        <button onClick={toggle} type="button">
          {expanded ? "collapse" : "expand"}
        </button>
      )}
    </li>
  );
};
