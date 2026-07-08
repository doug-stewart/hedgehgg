import { useLinkwarden } from "../../hooks/useLinkwarden";
import { Collection } from "../collection/Collection";
import styles from "./Bookmarks.module.css";

export const Bookmarks = () => {
  const { bookmarks, isLoading, isSuccess } = useLinkwarden();

  return (
    <section>
      <h2>Bookmarks</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <ul className={styles.bookmarks}>
          {bookmarks.map((collection) => (
            <Collection collection={collection} key={collection.id} />
          ))}
        </ul>
      ) : null}
    </section>
  );
};
