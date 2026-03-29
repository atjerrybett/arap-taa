'use client';

import { useEffect } from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-earth-900 dark:text-earth-100 mb-2">
          Oops!
        </h1>
        <p className="text-earth-600 dark:text-earth-400 mb-8">
          Something went wrong while exploring the family tree.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors"
        >
          <RotateCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}
