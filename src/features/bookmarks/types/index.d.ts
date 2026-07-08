export type Link = {
  id: number;
  name: string;
  url: string;
  description: string;
  createdAt: string;
};

export type Collection = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  links: Array<Link>;
};

export type Bookmarks = Array<Collection>;
