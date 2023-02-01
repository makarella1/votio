import { APIError, RequestResponse } from "./types";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const BASE_URL = `http://${import.meta.env.VITE_API_HOST}:${parseInt(
  import.meta.env.VITE_API_PORT,
)}`;

export const request = async <T>(
  endpoint: string,
  req: RequestInit,
): Promise<RequestResponse<T>> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    ...req,
  });

  const responseJSON = await response.json();

  if (!response.ok) {
    throw new Error((responseJSON as APIError).messages[0]);
  }

  return {
    data: responseJSON as T,
  };
};
