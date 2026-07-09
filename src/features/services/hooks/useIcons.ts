"use client";

import { useQuery } from "@tanstack/react-query";
import type { IconData } from "../types";

const ICONS_URL = "https://raw.githubusercontent.com/selfhst/icons/refs/heads/main/index.json";

const normalize = (string: string) => string.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

export const useIcons = () => {
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

  const getIcons = (name: string) => {
    const matches = allIcons.filter((icon) => normalize(icon.Name).includes(normalize(name)));
    return matches ?? [];
  };

  const getIcon = (nameOrReference: string) => {
    const exactMatch = allIcons.find(
      (icon) => icon.Name === nameOrReference || icon.Reference === nameOrReference,
    );
    return exactMatch;
  };

  const getIconUrl = (nameOrReference: string) => {
    const icon = getIcon(nameOrReference);

    if (!icon) return null;

    const url =
      icon &&
      (icon.SVG === "Yes"
        ? `https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/${icon.Reference}.svg`
        : `https://cdn.jsdelivr.net/gh/selfhst/icons@main/webp/${icon.Reference}.webp`);

    return url;
  };

  return {
    allIcons,
    getIcon,
    getIcons,
    getIconUrl,
  };
};
