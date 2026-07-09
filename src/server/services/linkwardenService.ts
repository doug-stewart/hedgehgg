import { AppError, BadRequestError } from "../errors/AppError";
import * as profileRepository from "../repositories/profileRepository";
import type {
  LinkwardenCollection,
  LinkwardenCollectionResponse,
  LinkwardenCollectionsResponse,
} from "../types/linkwarden";

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
  url: string,
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

    const collections = (await fetch(
      `${url}/api/v1/collections`,
      fetchOptions,
    ).then((response) => response.json())) as LinkwardenCollectionsResponse;

    for (const collection of collections.response) {
      const { id, name, description, createdAt } = collection;
      collated.push({ id, name, description, createdAt, links: [] });
    }

    const allLinks = collated.map(
      (collection) =>
        fetch(
          `${url}/api/v1/search?collectionId=${collection.id}&sort=alphabetical`,
          fetchOptions,
        ).then((response) =>
          response.json(),
        ) as Promise<LinkwardenCollectionResponse>,
    );

    const linksResponses = await Promise.all(allLinks);

    for (const linkResponse of linksResponses) {
      const {
        data: { links },
      } = linkResponse;

      const collection = collated.find(
        (coll) => coll.id === links[0]?.collection.id,
      );

      if (collection) {
        collection.links = links.map(
          ({ id, name, url, description, createdAt }) => ({
            id,
            name,
            url,
            description,
            createdAt,
          }),
        );
      }
    }

    return collated;
  } catch (_) {
    throw new AppError("Failed to fetch Linkwarden collections", 502);
  }
};
