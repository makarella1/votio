import Cookies from "js-cookie";

export interface CookieParams {
  name: string;
  value: any;
  expires: Date;
  attributes?: Omit<Cookies.CookieAttributes, "expires">;
}
