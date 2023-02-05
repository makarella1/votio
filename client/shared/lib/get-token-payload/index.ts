import { TokenPayload } from "./types";

export const getTokenPayload = (accessToken: string): TokenPayload =>
  JSON.parse(window.atob(accessToken.split(".")[1])) as TokenPayload;
