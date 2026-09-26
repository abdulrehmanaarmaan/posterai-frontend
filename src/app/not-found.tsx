import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold text-teal-700">
          404 error
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          The page you are looking for does not exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Go home
          </Link>

          <Link
            href="/templates"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Browse templates
          </Link>
        </div>
      </div>
    </main>
  );
}