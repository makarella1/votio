export interface APIError {
  messages: string[];
  statusCode?: number;
}

export interface RequestResponse<T> {
  data: T | Record<string, never>;
  error?: APIError;
}
