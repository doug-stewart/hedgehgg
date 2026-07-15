export type SelfhstIcon = {
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

export type LinkwardenLink = {
  id: number;
  name: string;
  url: string;
  description: string;
  createdAt: string;
};

export type LinkwardenCollection = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  links: Array<LinkwardenLink>;
};
