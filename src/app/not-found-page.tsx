import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Not Found - Arap Taa Family Legacy',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 mx-auto text-amber-500 mb-6" />
        <h1 className="text-4xl font-bold text-earth-900 dark:text-earth-100 mb-2">
          Page Not Found
        </h1>
        <p className="text-earth-600 dark:text-earth-400 mb-8">
          This page doesn't exist in the Arap Taa family legacy.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
