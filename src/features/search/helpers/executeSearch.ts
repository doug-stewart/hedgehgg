import type { LinkwardenLink } from "@/features/linkwarden/types";

export const executeSearch = (query: string, links: Array<LinkwardenLink>, meta?: boolean) => {
  const url =
    links.find((link) => link.name === query)?.url ||
    `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const target = meta ? "_blank" : "_self";
  window.open(url, target, "noopener noreferrer");
};
