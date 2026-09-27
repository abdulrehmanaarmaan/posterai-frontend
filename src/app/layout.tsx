import type { Metadata } from 'next';

import './globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import QueryProvider from '@/components/providers/QueryProvider';
import AuthProvider from '@/components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'AI Poster Maker',
  description:
    'Create AI-assisted political posters with precise Bangla text rendering.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <QueryProvider>
          <AuthProvider>
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}