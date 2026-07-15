import clsx from "clsx";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styles from "./Combobox.module.css";

type ComboboxProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  onAccept?: (value: string) => void;
  onChange?: (value: string) => void;
  id?: string;
  icon?: React.ReactNode;
  className?: string;
};

export const Combobox = ({
  label,
  name,
  options,
  onAccept,
  onChange,
  id,
  className,
}: ComboboxProps) => {
  const { control, resetField } = useFormContext();
  const { field } = useController({ name, control });
  const inputValue = field.value ?? "";

  const uid = useId();
  const internalId = id || uid;

  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const list = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [listFocused, setListFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);
    onChange?.(event.target.value);
  };

  const handleSelect = (selected: string) => {
    setSelectedOption(selected);

    const { label, value } = options.find((option) => option.value === selected) || {
      label: "",
      value: "",
    };

    if (label && value) {
      onAccept?.(value);
      field.onChange(label);
      setOpen(false);
    }
  };

  const handleKeySelect = (event: KeyboardEvent<HTMLDivElement>, selected: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(selected);
    }
  };

  const handleFocus = () => {
    const { label } = options.find((option) => option.value === selectedOption) || {
      label: "",
    };
    if (inputValue !== label || selectedOption === "") setOpen(true);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    let flag = false;
    const isAltKey = event.altKey;

    if (event.ctrlKey || event.shiftKey || event.metaKey) return;

    const length = inputValue?.length;

    const matches = options.find((option) => option.value === selectedOption);

    const matchesIndex = options.findIndex((option) => option.value === selectedOption);

    const nextOption = options.at(matchesIndex + 1) || options.at(0);
    const prevOption = options.at(matchesIndex - 1) || options.at(-1);

    setOpen(true);

    switch (event.key) {
      case "Enter":
        if (open) {
          flag = true;
        }

        if (listFocused && matches) {
          field.onChange(matches.label);
        }

        setOpen(false);

        break;

      case "ArrowDown":
        flag = true;

        if (options.length === 0) break;

        setOpen(true);

        if (isAltKey) break;

        if (nextOption) {
          setListFocused(true);
          setSelectedOption(nextOption.value);
        }
        break;

      case "ArrowUp":
        flag = true;

        if (isAltKey) break;

        if (prevOption) {
          setListFocused(true);
          setSelectedOption(prevOption.value);
        }

        break;

      case "Escape":
        flag = true;

        if (open) {
          setOpen(false);
        } else {
          setSelectedOption("");
        }

        break;

      case "Tab":
        if (matches && listFocused) {
          flag = true;
          field.onChange(matches.label);
        }

        setSelectedOption("");
        setOpen(false);

        break;

      case "Home":
        flag = true;
        input.current?.setSelectionRange(0, 0);
        break;

      case "End":
        flag = true;
        input.current?.setSelectionRange(length, length);
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleClear = () => {
    handleSelect("");
    resetField(name);
    onChange?.("");
  };

  // Handles input value change reactions
  useEffect(() => {
    if (!inputValue || inputValue === "") return;

    // setOpen(true);
    setSelectedOption("");
    setListFocused(false);
  }, [inputValue]);

  // Handles closing the dropdown and firing the onChange when clicking outside the container
  useEffect(() => {
    const close = (Event: MouseEvent) => {
      const target = Event.target as HTMLElement;
      const isWithin = !!target.closest("combobox");
      const value = options.find((option) => option.label === inputValue)?.value || inputValue;

      if (value) onAccept?.(value);
      if (!isWithin) setOpen(false);
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [options, onAccept, inputValue]);

  // Handles scrolling the selected item into view
  useEffect(() => {
    const selected = list.current?.querySelector(`[data-value="${selectedOption}"]`);
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedOption]);

  return (
    <div
      className={clsx(styles.box, className)}
      data-testid="container"
      ref={container}
      style={{ anchorScope: `--anchor` }}
    >
      <input
        aria-autocomplete="list"
        aria-controls={`${internalId}-list`}
        aria-expanded={open}
        autoCapitalize="off"
        autoComplete="off"
        className={styles.input}
        data-1p-ignore
        data-testid="combobox"
        id={internalId}
        name={field.name}
        onBlur={field.onBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={(event) => handleKeyPress(event)}
        popoverTarget={`${internalId}-list`}
        ref={(e) => {
          field.ref(e);
          input.current = e;
        }}
        role="combobox"
        type="text"
        value={inputValue}
      />
      {open && options.length > 0 && (
        <div
          aria-expanded={open}
          aria-label={label}
          className={styles.list}
          id={`${internalId}-list`}
          popover="auto"
          ref={list}
          role="listbox"
        >
          {options.map(({ value, label }) => (
            <div
              aria-selected={value === selectedOption}
              className={clsx(styles.option, {
                [styles.selected]: value === selectedOption,
              })}
              data-value={value}
              id={`${internalId}-${value}`}
              key={value}
              onClick={() => handleSelect(value)}
              onKeyDown={(event) => handleKeySelect(event, value)}
              role="option"
              tabIndex={0}
            >
              {label}
            </div>
          ))}
        </div>
      )}
      {inputValue !== "" && (
        <button className={styles.clear} onClick={handleClear} title="clear" type="button">
          <span role="presentation">&times;</span>
        </button>
      )}
    </div>
  );
};
