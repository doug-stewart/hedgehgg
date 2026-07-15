"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Combobox } from "../../../../components/combobox/Combobox";
import { useLinkwardenSearch } from "../../../linkwarden/hooks/useLinkwardenSearch";
import { getGoogleSuggestions } from "../../helpers/getGoogleSuggestions";
import { useSearchStore } from "../../stores/search.store";
import styles from "./Search.module.css";

export const Search = () => {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  const searchStore = useSearchStore();

  const formProps = useForm({ defaultValues: { search: "" } });
  const { watch } = formProps;
  const searchValue = watch("search");

  const { results } = useLinkwardenSearch(searchValue);

  const getSuggestions = async (value = "") => {
    searchStore.setFilter(value);
    getGoogleSuggestions(value, setSuggestions);
  };

  const onSubmit = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchValue)}`;
    const target = event?.ctrlKey || event?.metaKey ? "_blank" : "_self";
    window.open(url, target, "noopener noreferrer");
  };

  const collatedOptions = [
    ...suggestions.map((suggestion) => ({
      label: suggestion,
      value: suggestion,
    })),
    ...results.map((result) => ({
      label: result.name,
      value: String(result.id),
    })),
  ];

  return (
    <FormProvider {...formProps}>
      <form className={styles.form} onKeyDown={onSubmit} onSubmit={(e) => e.preventDefault()}>
        <Combobox
          className={styles.search}
          label="Search..."
          name="search"
          onChange={getSuggestions}
          options={collatedOptions}
        />
        <a
          aria-disabled={!searchValue}
          className={styles.button}
          href={`https://www.google.com/search?q=${encodeURIComponent(searchValue)}`}
          rel="noopener noreferrer"
        >
          Search
        </a>
      </form>
    </FormProvider>
  );
};
