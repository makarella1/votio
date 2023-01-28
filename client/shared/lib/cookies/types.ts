import Cookies from "js-cookie";

export interface SetCookieParams {
  name: string;
  value: any;
  attributes?: Cookies.CookieAttributes;
}
