import { debounce } from "@tanstack/pacer";

const performSearch = async (
  query: string,
  setterFn: (suggestions: Array<string>) => void,
  limit?: number,
) => {
  const trimmed = query.trim();

  if (!trimmed || trimmed.length < 3) {
    setterFn([]);
    return;
  }

  try {
    const response = await fetch(`/api/google/suggestions?q=${encodeURIComponent(trimmed)}`);

    const data = await response.json();
    setterFn(data.slice(0, limit ?? 5) as Array<string>);
  } catch (error) {
    console.error("Error fetching suggestions", error);
    setterFn([]);
  }
};

export const getGoogleSuggestions = debounce(performSearch, {
  wait: 250,
});
