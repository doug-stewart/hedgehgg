import clsx from "clsx";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
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
  const { register, watch, setValue, resetField } = useFormContext();
  const inputValue = watch(name);
  const { ref: rhfRef, onChange: onRHFChange, ...rhfProps } = register(name);

  const uid = useId();
  const internalId = id || uid;

  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const list = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [listFocused, setListFocused] = useState(false);

  const filteredOptions = options.filter((option) =>
    [option.value.toLowerCase(), option.label.toLowerCase()].some((text) =>
      text.includes(inputValue.toLowerCase() || ""),
    ),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRHFChange(event);
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
      setValue(name, label);
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

    const length = inputValue.value?.length;

    const matches = filteredOptions.find((option) => option.value === selectedOption);

    const matchesIndex = filteredOptions.findIndex((option) => option.value === selectedOption);

    const nextOption = filteredOptions.at(matchesIndex + 1) || filteredOptions.at(0);
    const prevOption = filteredOptions.at(matchesIndex - 1) || filteredOptions.at(-1);

    setOpen(true);

    switch (event.key) {
      case "Enter":
        if (open) {
          flag = true;
        }

        if (listFocused && matches) {
          setValue(name, matches.label);
        }

        setOpen(false);

        break;

      case "ArrowDown":
        flag = true;

        if (filteredOptions.length === 0) break;

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
          setValue(name, matches.label);
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
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={(event) => handleKeyPress(event)}
        popoverTarget={`${internalId}-list`}
        ref={(e) => {
          rhfRef(e);
          input.current = e;
        }}
        role="combobox"
        type="text"
        value={inputValue}
        {...rhfProps}
      />
      {open && filteredOptions.length > 0 && (
        <div
          aria-expanded={open}
          aria-label={label}
          className={styles.list}
          id={`${internalId}-list`}
          popover="auto"
          ref={list}
          role="listbox"
        >
          {filteredOptions.map(({ value, label }) => (
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
