import type {
  User,
} from '@/types/auth';

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

export const saveAuth = (
  token: string,
  user: User
): void => {
  localStorage.setItem(
    TOKEN_KEY,
    token
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const getAuthToken =
  (): string | null => {
    if (
      typeof window === 'undefined'
    ) {
      return null;
    }

    return localStorage.getItem(
      TOKEN_KEY
    );
  };

export const getAuthUser =
  (): User | null => {
    if (
      typeof window === 'undefined'
    ) {
      return null;
    }

    const value =
      localStorage.getItem(USER_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(
        value
      ) as User;
    } catch {
      return null;
    }
  };

export const clearAuth =
  (): void => {
    localStorage.removeItem(
      TOKEN_KEY
    );

    localStorage.removeItem(
      USER_KEY
    );
  };