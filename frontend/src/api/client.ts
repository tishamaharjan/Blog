const BASE_URL = import.meta.env.VITE_BASE_URL;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const { headers, ...rest } = options;

  // FormData bodies must not carry an explicit Content-Type: the browser sets it
  // together with the multipart boundary. Setting it by hand strips the boundary
  // and the server cannot parse the parts.
  const isFormData =
    typeof FormData !== "undefined" && rest.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    // Must stay after `...rest` so callers cannot accidentally drop the auth cookie.
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new ApiError(
      error?.message || `API error: ${res.status}`,
      res.status,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
