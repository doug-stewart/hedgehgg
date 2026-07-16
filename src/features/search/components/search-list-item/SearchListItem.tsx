import styles from "./SearchListItem.module.css";

type SearchListItemProps = {
  value: string;
  selected: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const SearchListItem = ({ value, selected, onClick }: SearchListItemProps) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: the search field controls any keyboard event
    <div
      aria-selected={value === selected}
      className={styles.option}
      key={value}
      onClick={onClick}
      role="option"
      tabIndex={0}
    >
      {value}
    </div>
  );
};
