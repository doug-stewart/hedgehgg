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

export type Episodie = {
  airingAt: string;
  episodeNumber: number;
  id: number;
  seasonNumber: number;
  series: string;
  title: string;
};

export type Episodes = Array<Episodie>;

export type InlineSVG = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;
