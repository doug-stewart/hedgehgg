import { AppError, BadRequestError } from "../errors/AppError";
import * as profileRepository from "../repositories/profileRepository";
import type {
  LinkwardenCollection,
  LinkwardenCollectionResponse,
  LinkwardenCollectionsResponse,
  LinkwardenLink,
  LinkwardenLinksResponse,
} from "../types/linkwarden";

const toLink = ({ id, name, url, description, createdAt }: LinkwardenLink): LinkwardenLink => ({
  id,
  name,
  url,
  description,
  createdAt,
});

export const getCurrentUserLinkwarden = async (
  userId: string,
): Promise<{ token: string; url: string }> => {
  const profile = await profileRepository.findById(userId);
  const token = profile?.linkwarden_token;
  const url = profile?.linkwarden_url;

  if (!token || !url) {
    throw new BadRequestError("Linkwarden token or URL not set in profile");
  }

  return { token, url };
};

export const getLinkwardenLinks = async (
  host: string,
  token: string,
): Promise<Array<LinkwardenCollection>> => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const collated: Array<LinkwardenCollection> = [];

    const collections = (await fetch(`${host}/api/v1/collections`, fetchOptions).then((response) =>
      response.json(),
    )) as LinkwardenCollectionsResponse;

    for (const collection of collections.response) {
      const { id, name, description, createdAt } = collection;
      collated.push({ id, name, description, createdAt, links: [] });
    }

    const allLinks = collated.map(
      (collection) =>
        fetch(
          `${host}/api/v1/search?collectionId=${collection.id}&sort=alphabetical`,
          fetchOptions,
        ).then((response) => response.json()) as Promise<LinkwardenCollectionResponse>,
    );

    const linksResponses = await Promise.all(allLinks);

    for (const linkResponse of linksResponses) {
      const {
        data: { links },
      } = linkResponse;

      const collection = collated.find((coll) => coll.id === links[0]?.collection.id);

      if (collection) {
        collection.links = links.map(toLink);
      }
    }

    return collated;
  } catch (_) {
    throw new AppError("Failed to fetch Linkwarden collections", 502);
  }
};

export const getLinkwardenSearchResults = async (
  host: string,
  token: string,
  query: string,
): Promise<Array<LinkwardenLink>> => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const q = query.trim().toLowerCase();

    const searchLinks = (params: string) =>
      fetch(`${host}/api/v1/search?${params}`, fetchOptions).then(
        (response) => response.json() as Promise<LinkwardenCollectionResponse>,
      );

    const titleResponse = await searchLinks(`searchQueryString=${encodeURIComponent(query)}`);
    const titleMatches = titleResponse.data.links.filter((link) =>
      link.name.toLowerCase().includes(q),
    );

    const { response: collections } = (await fetch(`${host}/api/v1/collections`, fetchOptions).then(
      (response) => response.json(),
    )) as LinkwardenCollectionsResponse;
    const matchingCollections = collections.filter((collection) =>
      collection.name.toLowerCase().includes(q),
    );
    const collectionResponses = await Promise.all(
      matchingCollections.map((collection) =>
        searchLinks(`collectionId=${collection.id}&sort=alphabetical`),
      ),
    );
    const collectionMatches = collectionResponses.flatMap((response) => response.data.links);

    const tags = await fetch(`${host}/api/v1/tags`, fetchOptions)
      .then((response) => response.json())
      .then((data) => data.data.tags as Array<LinkwardenLink>);

    const matchingTags = tags.filter((tag) => tag.name.toLowerCase().includes(q));
    const tagResponses = await Promise.all(
      matchingTags.map((tag) => searchLinks(`tagId=${tag.id}`)),
    );
    const tagMatches = tagResponses.flatMap((response) => response.data.links);

    const seen = new Set<string>();
    const results: Array<LinkwardenLink> = [];

    for (const link of [...titleMatches, ...collectionMatches, ...tagMatches]) {
      if (seen.has(link.name)) continue;
      seen.add(link.name);
      results.push(toLink(link));
    }

    return results;
  } catch (error) {
    console.log({ error });
    throw new AppError("Failed to fetch Linkwarden search results", 502);
  }
};

export const getLinkwardenPinnedLinks = async (
  host: string,
  token: string,
): Promise<Array<LinkwardenLink>> => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { response } = (await fetch(`${host}/api/v1/links?pinnedOnly=true`, fetchOptions).then(
      (res) => res.json(),
    )) as LinkwardenLinksResponse;

    return response.map(toLink);
  } catch (_) {
    throw new AppError("Failed to fetch Linkwarden pinned links", 502);
  }
};
