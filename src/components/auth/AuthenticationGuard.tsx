'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

interface AuthenticationGuardProps {
  children: React.ReactNode;
}

const protectedRoutes = [
  '/create-poster',
  '/posters',
];

const guestOnlyRoutes = [
  '/login',
  '/register',
];

export default function AuthenticationGuard({
  children,
}: AuthenticationGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useAuth();

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );

  const isGuestOnlyRoute = guestOnlyRoutes.includes(pathname);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Protected route → unauthenticated user
    if (isProtectedRoute && !isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`,
      );

      return;
    }

    // Login/Register → already authenticated user
    if (isGuestOnlyRoute && isAuthenticated) {
      router.push('/create-poster');
    }
  }, [
    isAuthenticated,
    isLoading,
    pathname,
    router,
    isProtectedRoute,
    isGuestOnlyRoute,
  ]);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Checking authentication...
        </p>
      </main>
    );
  }

  // Don't render protected pages for unauthenticated users.
  if (isProtectedRoute && !isAuthenticated) {
    return null;
  }

  // Don't render login/register for authenticated users.
  if (isGuestOnlyRoute && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}