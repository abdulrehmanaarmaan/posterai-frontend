'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  apiClient,
} from '@/lib/api-client';

import {
  clearAuth,
  getAuthUser,
  saveAuth,
} from '@/lib/auth';

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '@/types/auth';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    payload: LoginPayload
  ) => Promise<AuthResponse>;
  register: (
    payload: RegisterPayload
  ) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [
    user,
    setUser,
  ] = useState<User | null>(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  useEffect(() => {
    const storedUser =
      getAuthUser();

    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (
      payload: LoginPayload
    ) => {
      const result =
        await apiClient.post<AuthResponse>(
          '/auth/login',
          payload
        );

      saveAuth(
        result.token,
        result.user
      );

      setUser(result.user);

      return result;
    },
    []
  );

  const register = useCallback(
    async (
      payload: RegisterPayload
    ) => {
      const result =
        await apiClient.post<AuthResponse>(
          '/auth/register',
          payload
        );

      saveAuth(
        result.token,
        result.user
      );

      setUser(result.user);

      return result;
    },
    []
  );

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  const value =
    useMemo<AuthContextValue>(
      () => ({
        user,
        isAuthenticated:
          Boolean(user),
        isLoading,
        login,
        register,
        logout,
      }),
      [
        user,
        isLoading,
        login,
        register,
        logout,
      ]
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext must be used inside AuthProvider.'
    );
  }

  return context;
}