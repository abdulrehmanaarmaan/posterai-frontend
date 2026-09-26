"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setServerError("");

      await login(values);

      router.push("/create-poster");
    } catch (error: any) {
      if (error.message) {
        setServerError(error.message);
      } else {
        setServerError("Unable to sign in. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </div>
      )}

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}
