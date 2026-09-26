'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  useForm,
} from 'react-hook-form';
import {
  zodResolver,
} from '@hookform/resolvers/zod';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

import {
  registerSchema,
  type RegisterFormValues,
} from '@/schemas/auth.schema';

import { useAuth } from '@/hooks/useAuth';

export default function RegisterForm() {
  const router = useRouter();

  const { register: registerUser } =
    useAuth();

  const [serverError, setServerError] =
    useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (
    values: RegisterFormValues,
  ) => {
    try {
      setServerError('');

      await registerUser(values);

      router.push('/create-poster');
    } catch (error: any) {
      if (error.message) {
        setServerError(error.message);
      } else {
        setServerError(
          'Unable to create your account. Please try again.',
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </div>
      )}

      <Input
        label="Full name"
        type="text"
        autoComplete="name"
        placeholder="Your full name"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 6 characters"
        {...register('password')}
        error={
          errors.password?.message ??
          (password && password.length < 6
            ? 'Password is too short.'
            : undefined)
        }
      />

      <Button
        type="submit"
        className="w-full"
        loading={isSubmitting}
      >
        Create account
      </Button>
    </form>
  );
}