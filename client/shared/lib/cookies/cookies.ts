import Cookies from "js-cookie";

import { SetCookieParams } from "./types";

export const set = ({ name, value, attributes }: SetCookieParams) => {
  Cookies.set(name, value, attributes);
};
