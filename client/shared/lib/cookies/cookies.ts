import { createEffect } from "effector";
import Cookies from "js-cookie";

import { CookieParams } from "./types";

export const setCookieFx = createEffect(
  ({ name, value, expires, attributes }: CookieParams) => {
    Cookies.set(name, value, {
      expires,
      secure: true,
      sameSite: "strict",
      ...attributes,
    });
  },
);

export const removeCookieFx = createEffect((name: string) => {
  Cookies.remove(name);
});

export const get = (name: string) => Cookies.get(name);
