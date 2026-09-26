import AuthenticationGuard from "@/components/auth/AuthenticationGuard";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <AuthenticationGuard>
        <div className="mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-2">
          {/* Brand / information panel */}
          <section
            aria-labelledby="login-heading"
            className="hidden bg-slate-900 p-8 text-white lg:flex lg:flex-col lg:justify-between lg:p-12"
          >
            <div>
              <Link href="/" className="text-lg font-bold">
                AI Poster Maker
              </Link>
            </div>

            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Welcome back
              </p>

              <h1
                id="login-heading"
                className="mt-4 text-4xl font-bold tracking-tight"
              >
                Create professional posters with a streamlined workflow.
              </h1>

              <p className="mt-6 leading-7 text-slate-300">
                Sign in to access your templates, generated posters, and poster
                history.
              </p>
            </div>

            <p className="text-sm text-slate-400">© 2026 AI Poster Maker</p>
          </section>

          {/* Form panel */}
          <section className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <Link href="/" className="text-lg font-bold">
                  AI Poster Maker
                </Link>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider">
                  Account
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  Sign in
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Sign in to manage your posters and continue creating.
                </p>
              </div>

              <div className="mt-8">
                <LoginForm />
              </div>

              <p className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link href="/register" className="font-semibold">
                  Create one
                </Link>
              </p>
            </div>
          </section>
        </div>
      </AuthenticationGuard>
    </main>
  );
};

export default Login;
