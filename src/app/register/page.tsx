import AuthenticationGuard from "@/components/auth/AuthenticationGuard";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <AuthenticationGuard>
        <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-12 sm:px-6">
          <section aria-labelledby="register-heading" className="w-full">
            <div className="mx-auto max-w-md">
              <div className="text-center">
                <Link href="/" className="text-lg font-bold">
                  AI Poster Maker
                </Link>

                <p className="mt-8 text-sm font-semibold uppercase tracking-wider">
                  Get started
                </p>

                <h1
                  id="register-heading"
                  className="mt-2 text-3xl font-bold tracking-tight"
                >
                  Create your account
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Create an account to start designing and managing your
                  posters.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
                <RegisterForm />
              </div>

              <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </AuthenticationGuard>
    </main>
  );
};

export default Register;
