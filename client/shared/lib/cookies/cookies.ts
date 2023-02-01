import { createEffect } from "effector";
import Cookies from "js-cookie";

import { CookieParams } from "./types";

export const setCookieFx = createEffect(
  ({ name, value, expires, attributes }: CookieParams) => {
    Cookies.set(name, value, { expires, ...attributes });
  },
);
