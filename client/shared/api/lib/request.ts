import { APIError, RequestResponse } from "./types";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const BASE_URL = `http://${import.meta.env.VITE_API_HOST}:${parseInt(
  import.meta.env.VITE_API_PORT,
)}`;

export const request = async <T>(
  endpoint: string,
  req: RequestInit,
): Promise<RequestResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      ...req,
    });

    const responseJSON = await response.json();

    if (!response.ok) {
      return {
        data: {},
        error: responseJSON as APIError,
      };
    }

    return {
      data: responseJSON as T,
    };
  } catch (e) {
    const error =
      e instanceof Error
        ? { messages: [e.message] }
        : { messages: ["Unknown Error"] };

    return {
      data: {},
      error,
    };
  }
};
