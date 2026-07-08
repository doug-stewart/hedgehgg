import type { SessionResponse } from "better-auth/client";

export type Session = NonNullable<SessionResponse>;

export type BaseSessionResult = {
  isPending: boolean;
  refetch: () => void;
  login: () => Promise<ErrorContext | undefined>;
  signup: (email: string) => Promise<ErrorContext | undefined>;
  logout: () => Promise<void>;
};

export type LoggedInSessionResult = BaseSessionResult & {
  isLoggedIn: true;
  session: Session;
};

export type LoggedOutSessionResult = BaseSessionResult & {
  isLoggedIn: false;
  session: null;
};

export type SessionResult = LoggedInSessionResult | LoggedOutSessionResult;
