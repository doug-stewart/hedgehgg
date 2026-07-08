export type Service = {
  id: string;
  name: string;
  user_id: string;
  abbr: string;
  href: string;
  icon: string;
};

export type Services = Array<Service>;

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

export type ServiceMutation = UseMutationResult<Service, Error, NonNullable<Service>, unknown>;
