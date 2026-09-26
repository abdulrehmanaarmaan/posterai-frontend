'use client';

import {
  useState,
} from 'react';

import {
  useTemplates,
} from '@/hooks/useTemplates';

import OccasionFilter from '@/components/templates/OccasionFilter';

import TemplateGrid from '@/components/templates/TemplateGrid';

export default function TemplatesPage() {
  const [
    occasion,
    setOccasion,
  ] = useState('');

  const {
    templates,
    isLoading,
    isError,
    error,
  } = useTemplates(occasion);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-700">
            Template library
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Choose a poster template
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Select a curated template and customize it with your
            poster information.
          </p>
        </div>

        <OccasionFilter
          value={occasion}
          onChange={setOccasion}
        />
      </div>

      {isLoading && (
        <div className="py-20 text-center text-sm text-slate-500">
          Loading templates...
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error?.message ??
            'Unable to load templates.'}
        </div>
      )}

      {!isLoading &&
        !isError && (
          <TemplateGrid
            templates={templates}
          />
        )}
    </main>
  );
}