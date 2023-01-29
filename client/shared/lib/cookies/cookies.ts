import Cookies from "js-cookie";

import { SetCookieParams } from "./types";

export const set = ({ name, value, expires, attributes }: SetCookieParams) => {
  const expiresDate = new Date(new Date().getTime() + expires);

  Cookies.set(name, value, { expires: expiresDate, ...attributes });
};
