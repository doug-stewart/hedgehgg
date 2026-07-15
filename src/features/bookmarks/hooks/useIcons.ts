import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/features/user/hooks/useTheme";
import type { IconData } from "../types";

const ICONS_URL = "https://raw.githubusercontent.com/selfhst/icons/refs/heads/main/index.json";

const normalize = (string: string) => string.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

export const useIcons = () => {
  const { display } = useTheme();
  const theme = display === "dark" ? "light" : "dark";

  const { data } = useQuery({
    queryKey: ["icons"],
    queryFn: async () => {
      const response = await fetch(ICONS_URL);
      const data = await response.json();
      return data;
    },
    staleTime: Infinity,
  });

  const allIcons: Array<IconData> = data instanceof Error || data === undefined ? [] : data;

  const getMatches = (nameOrReference: string) => {
    const exactMatch = allIcons.find(
      (icon) => icon.Name === nameOrReference || icon.Reference === nameOrReference,
    );

    const semiMatch = allIcons.find((icon) =>
      normalize(icon.Name).includes(normalize(nameOrReference)),
    );

    const wordMatches = nameOrReference
      .split(" ")
      .map((word) => {
        return allIcons.find((icon) => normalize(icon.Name).includes(normalize(word)));
      })
      .filter(Boolean);

    const bestMatches: Array<IconData> = [exactMatch, semiMatch, ...wordMatches].filter(
      (data) => data !== undefined,
    );

    return bestMatches;
  };

  const getIcon = (nameOrReference: string) => {
    const matches = getMatches(nameOrReference);
    return matches.at(0);
  };

  const getIcons = (name: string) => {
    const matches = getMatches(name);
    return matches ?? [];
  };

  const getIconUrl = (nameOrReference: string) => {
    const icon = getIcon(nameOrReference);

    if (!icon) return null;

    const url =
      icon &&
      (icon.SVG === "Yes"
        ? `https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/${icon.Reference}-${theme}.svg`
        : `https://cdn.jsdelivr.net/gh/selfhst/icons@main/webp/${icon.Reference}-${theme}.webp`);

    return url;
  };

  return {
    allIcons,
    getIcon,
    getIcons,
    getIconUrl,
  };
};
