import { TreePine } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-forest-50 dark:bg-forest-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <TreePine className="w-16 h-16 mx-auto text-forest-300 dark:text-forest-700 mb-6" />
        <h1 className="text-4xl font-bold text-forest-900 dark:text-forest-100 mb-2">
          404
        </h1>
        <p className="text-forest-600 dark:text-forest-400 mb-8">
          This page doesn't exist in the Arap Taa family legacy.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-copper-600 hover:bg-copper-700 text-white rounded-xl font-semibold transition-colors"
        >
          <TreePine className="w-5 h-5" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
