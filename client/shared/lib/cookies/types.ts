import Cookies from "js-cookie";

export interface SetCookieParams {
  name: string;
  value: any;
  expires: number;
  attributes?: Omit<Cookies.CookieAttributes, "expires">;
}
