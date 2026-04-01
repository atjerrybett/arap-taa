import Link from 'next/link';
import { TreePine, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-earth-100 dark:bg-earth-900 border-t border-earth-200 dark:border-earth-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-earth-900 dark:text-earth-100">
                  Arap Taa Family Legacy
                </h3>
              </div>
            </Link>
            <p className="text-earth-600 dark:text-earth-400 text-sm">
              Preserving our heritage, celebrating our ancestors, and connecting generations through the digital preservation of our family history.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-earth-900 dark:text-earth-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-earth-600 dark:text-earth-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tree" className="text-earth-600 dark:text-earth-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  Family Tree
                </Link>
              </li>
              <li>
                <Link href="/people" className="text-earth-600 dark:text-earth-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  People Directory
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-earth-600 dark:text-earth-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  About the Legacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Houses */}
          <div>
            <h4 className="font-semibold text-earth-900 dark:text-earth-100 mb-4">The Three Houses</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-earth-600 dark:text-earth-400">House of Bot Evaline</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                <span className="text-earth-600 dark:text-earth-400">House of Bot Jonah</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-violet-500"></span>
                <span className="text-earth-600 dark:text-earth-400">House of Bot Samson</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-earth-200 dark:border-earth-800">
          <p className="text-center text-earth-600 dark:text-earth-400 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Jerry for the Arap Taa Family
          </p>
          <p className="text-center text-earth-500 dark:text-earth-500 text-xs mt-2">
            © {new Date().getFullYear()} Arap Taa Family Legacy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
