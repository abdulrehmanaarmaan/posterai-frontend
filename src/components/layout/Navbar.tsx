"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  WandSparkles,
  LogIn,
  UserPlus,
  LogOut,
  Images,
  Plus,
} from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  {
    href: "/templates",
    label: "Templates",
  },
  {
    href: "/create-poster",
    label: "Create Poster",
  },
  {
    href: "/posters",
    label: "My Posters",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-700 text-white">
            <WandSparkles size={19} aria-hidden="true" />
          </span>

          <span className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            AI Poster Maker
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-teal-50 text-teal-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop account */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoading ? (
            <div
              className="h-10 w-24 animate-pulse rounded-lg bg-slate-100"
              aria-hidden="true"
            />
          ) : isAuthenticated ? (
            <>
              <span className="hidden max-w-40 truncate text-sm text-slate-600 lg:block">
                {user?.name}
              </span>

              <Button variant="ghost" onClick={handleLogout}>
                <LogOut size={16} aria-hidden="true" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <LogIn size={16} aria-hidden="true" />
                Sign in
              </Link>

              <Link
                href="/register"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
              >
                <UserPlus size={16} aria-hidden="true" />
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? (
            <X size={21} aria-hidden="true" />
          ) : (
            <Menu size={21} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3 sm:px-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-teal-50 text-teal-800"
                    : "text-slate-700 hover:bg-slate-100",
                ].join(" ")}
              >
                {link.href === "/templates" && (
                  <Images size={17} aria-hidden="true" />
                )}

                {link.href === "/create-poster" && (
                  <Plus size={17} aria-hidden="true" />
                )}

                {link.href === "/posters" && (
                  <Images size={17} aria-hidden="true" />
                )}

                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-200" />

            {isLoading ? (
              <div className="px-3 py-3">
                <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              </div>
            ) : isAuthenticated ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} aria-hidden="true" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="grid gap-2 py-1">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  Create account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
