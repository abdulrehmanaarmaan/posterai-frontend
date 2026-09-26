import {
  getAuthToken,
} from './auth';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not configured.',
  );
}

const getToken = (): string | null => {
  return getAuthToken();
};

const getHeaders = (): HeadersInit => {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

const parseResponse = async <T>(
  response: Response,
): Promise<T> => {
  const contentType =
    response.headers.get(
      'content-type',
    );

  const isJson =
    contentType?.includes(
      'application/json',
    );

  const body = isJson
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(
      body?.message ??
        `Request failed with status ${response.status}.`,
    );
  }

  return body.data as T;
};

export const apiClient = {
  async get<T>(
    path: string,
  ): Promise<T> {
    const response =
      await fetch(
        `${API_URL}${path}`,
        {
          method: 'GET',

          headers: {
            ...getHeaders(),
          },

          cache: 'no-store',
        },
      );

    return parseResponse<T>(
      response,
    );
  },

  async post<T>(
    path: string,
    body?: unknown,
  ): Promise<T> {
    const response =
      await fetch(
        `${API_URL}${path}`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            ...getHeaders(),
          },

          body:
            body !== undefined
              ? JSON.stringify(body)
              : undefined,
        },
      );

    return parseResponse<T>(
      response,
    );
  },

  async delete<T>(
    path: string,
  ): Promise<T> {
    const response =
      await fetch(
        `${API_URL}${path}`,
        {
          method: 'DELETE',

          headers: {
            ...getHeaders(),
          },
        },
      );

    return parseResponse<T>(
      response,
    );
  },

  async postFormData<T>(
    path: string,
    formData: FormData,
  ): Promise<T> {
    /*
     * IMPORTANT:
     *
     * DO NOT set Content-Type manually here.
     *
     * The browser automatically creates:
     *
     * multipart/form-data; boundary=...
     *
     * Multer needs that boundary.
     */

    const response =
      await fetch(
        `${API_URL}${path}`,
        {
          method: 'POST',

          headers: {
            ...getHeaders(),
          },

          body: formData,
        },
      );

    return parseResponse<T>(
      response,
    );
  },
};