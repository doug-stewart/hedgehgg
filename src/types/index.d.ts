export type Episode = {
  airingAt: string;
  episodeNumber: number;
  id: number;
  seasonNumber: number;
  series: string;
  title: string;
};

export type Episodes = Array<Episode>;

export type InlineSVG = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;
