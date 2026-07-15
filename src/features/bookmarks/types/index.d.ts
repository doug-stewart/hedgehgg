export type IconData = {
  Name: string;
  Reference: string;
  SVG: string;
  PNG: string;
  WebP: string;
  Light: string;
  Dark: string;
  Category: string;
  Tags: string;
  CreatedAt: Date;
};

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
