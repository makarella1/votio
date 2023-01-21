export const Routes = {
  CREATE_POLL: "/create-poll",
  JOIN_POLL: "/join-poll",
  WELCOME: "/",
} as const;

export type RoutesTypes = (typeof Routes)[keyof typeof Routes];
