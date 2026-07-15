type LinkwardenResponseCollection = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

type LinkwardenResponseLink = {
  id: number;
  name: string;
  url: string;
  description: string;
  createdAt: Date;
  collection: { id: number };
};

export type LinkwardenCollectionsResponse = {
  response: Array<LinkwardenResponseCollection>;
};

export type LinkwardenCollectionResponse = {
  message: string;
  data: {
    nextCursor: number;
    links: Array<LinkwardenResponseLink>;
  };
};

export type LinkwardenLinksResponse = {
  response: Array<LinkwardenResponseLink>;
};

type LinkwardenResponseTag = {
  id: number;
  name: string;
};

export type LinkwardenTagsResponse = {
  response: Array<LinkwardenResponseTag>;
};

export type LinkwardenLink = {
  id: number;
  name: string;
  url: string;
  description: string;
  createdAt: Date;
};

export type LinkwardenCollection = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  links: Array<LinkwardenLink>;
};
