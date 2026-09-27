import Link from 'next/link';
import {
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-bold text-white"
            >
              AI Poster Maker
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              An AI-assisted poster creation platform for producing
              structured, high-resolution poster designs from reusable
              templates.
            </p>
          </div>

          {/* Product */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              Product
            </h2>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/templates"
                  className="hover:text-white"
                >
                  Templates
                </Link>
              </li>

              <li>
                <Link
                  href="/create-poster"
                  className="hover:text-white"
                >
                  Create Poster
                </Link>
              </li>

              <li>
                <Link
                  href="/posters"
                  className="hover:text-white"
                >
                  My Posters
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              Platform
            </h2>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck size={16} aria-hidden="true" />
                Secure account access
              </li>

              <li className="flex items-center gap-2">
                <Mail size={16} aria-hidden="true" />
                Support available
              </li>

              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <FaGithub size={16} aria-hidden="true" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-500">
            © 2026 AI Poster Maker. Built as a full-stack MVP.
          </p>
        </div>
      </div>
    </footer>
  );
}