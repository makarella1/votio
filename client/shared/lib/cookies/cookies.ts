import { createEffect } from "effector";
import Cookies from "js-cookie";

import { CookieParams, TokenPayload } from "./types";

export const setCookieFx = createEffect(
  ({ name, value, expires, attributes }: CookieParams) => {
    Cookies.set(name, value, { expires, ...attributes });
  },
);

export const get = (name: string) => Cookies.get(name);

export const getTokenPayload = (accessToken: string): TokenPayload =>
  JSON.parse(window.atob(accessToken.split(".")[1])) as TokenPayload;
