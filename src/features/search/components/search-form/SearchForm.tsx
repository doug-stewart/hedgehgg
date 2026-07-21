"use client";

import { useHotkey } from "@tanstack/react-hotkeys";
import clsx from "clsx";
import { useEffect, useId, useRef, useState } from "react";
import CloseIcon from "@/assets/images/close.svg";
import { useLinkwardenSearch } from "../../../linkwarden/hooks/useLinkwardenSearch";
import { executeSearch } from "../../helpers/executeSearch";
import { getGoogleSuggestions } from "../../helpers/getGoogleSuggestions";
import { selectNextPrevOption } from "../../helpers/selectNextPrevOption";
import { SearchListItem } from "../search-list-item/SearchListItem";
import styles from "./SearchForm.module.css";

const interceptKeys = ["Enter", "ArrowDown", "ArrowUp", "Escape", "Home", "End"];

export const SearchForm = () => {
  const id = useId();

  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");
  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  const { results } = useLinkwardenSearch(value.length < 3 ? "" : value);
  const links = results.map((result) => result.name);

  const reset = () => {
    setSelected("");
    setValue("");
    list.current?.hidePopover();
  };

  const setNewValue = (value: string) => {
    setSelected(value);
    setValue(value);
    list.current?.hidePopover();
  };

  const selectNextOption = () => {
    const next = selectNextPrevOption(1, suggestions, links, selected);
    if (next) list.current?.showPopover();
    next && setSelected(next);
  };

  const selectPrevOption = () => {
    const prev = selectNextPrevOption(-1, suggestions, links, selected);
    if (prev) list.current?.showPopover();
    prev && setSelected(prev);
  };

  const triggerSearch = (override?: string | null, meta?: boolean) =>
    executeSearch(override ?? value, results, meta);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue === "") {
      reset();
      return;
    }

    list.current?.showPopover();
    setValue(newValue);
    setSelected("");
    getGoogleSuggestions(newValue, setSuggestions);
  };

  const handleInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if (["Shift", "Meta", "Control"].includes(key)) return;

    if (key === "Delete") {
      if (value === "") {
        reset();
      }
    }

    if (key === "Tab" && open) {
      if (selected) setNewValue(selected);
      event.preventDefault();
      return;
    }

    if (!interceptKeys.includes(key)) return;
    event.preventDefault();

    if (key === "Escape") {
      list.current?.hidePopover();
    }

    if (key === "Home") {
      input.current?.setSelectionRange(0, 0);
    }

    if (key === "End") {
      input.current?.setSelectionRange(value.length, value.length);
    }

    if (key === "Enter" || key === " ") {
      if (selected) {
        setNewValue(selected);
        triggerSearch(selected, event.metaKey || event.ctrlKey);
      } else {
        triggerSearch(null, event.metaKey || event.ctrlKey);
      }
    }

    if (key === "ArrowDown") {
      selectNextOption();
    }

    if (key === "ArrowUp") {
      event.preventDefault();
      selectPrevOption();
    }
  };

  const handleListToggle = (event: React.ToggleEvent<HTMLDivElement>) => {
    setOpen(event.newState === "open");
  };

  useHotkey({ key: "f", shift: true }, () => {
    input.current?.focus();
  });

  useEffect(() => {
    if (!open) {
      list.current?.hidePopover();
      return;
    }
    list.current?.showPopover();
  }, [open]);

  useEffect(() => {
    if (!open || !selected) return;
    const selectedOption = list.current?.querySelector<HTMLElement>(`[aria-selected="true"]`);
    selectedOption?.scrollIntoView({ block: "nearest" });
  }, [open, selected]);

  return (
    <div
      className={clsx(styles.box, open && styles.open)}
      data-testid="container"
      ref={container}
      style={{ anchorScope: `--anchor` }}
    >
      <input
        aria-autocomplete="list"
        aria-controls={`${id}-list`}
        aria-expanded={open}
        autoCapitalize="off"
        autoComplete="off"
        className={styles.input}
        data-1p-ignore
        id={id}
        onChange={handleInputChange}
        onKeyDown={handleInputKey}
        placeholder="Ask the interlink?"
        popoverTarget={`${id}-list`}
        ref={input}
        role="combobox"
        type="search"
        value={value}
      />
      <div
        aria-expanded={open}
        aria-label={"Search"}
        className={clsx(
          styles.list,
          suggestions.length === 0 && links.length === 0 && styles.empty,
        )}
        id={`${id}-list`}
        onToggle={handleListToggle}
        popover="auto"
        ref={list}
        role="listbox"
      >
        <div className={clsx(styles.items)}>
          {suggestions.map((suggestion) => (
            <SearchListItem
              key={suggestion}
              onClick={() => setNewValue(suggestion)}
              selected={selected}
              value={suggestion}
            />
          ))}
          {links.length > 0 && <h3>From Linkwarden:</h3>}
          {links.map((result) => (
            <SearchListItem
              key={result}
              onClick={() => setNewValue(result)}
              selected={selected}
              value={result}
            />
          ))}
        </div>
      </div>
      {value !== "" && (
        <button className={styles.clear} onClick={reset} title="Clear search" type="button">
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
