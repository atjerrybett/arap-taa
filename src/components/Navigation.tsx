'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, TreePine, Users, Home, Info, Search } from 'lucide-react';
import { SearchModal } from './SearchModal';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tree', label: 'Full Tree', icon: TreePine },
  { href: '/people', label: 'People Directory', icon: Users },
  { href: '/about', label: 'About', icon: Info },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-forest-50/95 dark:bg-forest-950/95 backdrop-blur-sm border-b border-forest-200 dark:border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-copper-500 to-copper-700 flex items-center justify-center shadow-lg group-hover:shadow-copper-500/25 transition-shadow">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-forest-900 dark:text-forest-100">
                  Arap Taa
                </h1>
                <p className="text-xs text-forest-600 dark:text-forest-400 -mt-1">
                  Family Legacy
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-forest-700 dark:text-forest-300 hover:bg-forest-200 dark:hover:bg-forest-800 hover:text-copper-700 dark:hover:text-copper-500 transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-forest-700 dark:text-forest-300 hover:bg-forest-200 dark:hover:bg-forest-800 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-forest-700 dark:text-forest-300 hover:bg-forest-200 dark:hover:bg-forest-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-forest-200 dark:border-forest-800">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-forest-700 dark:text-forest-300 hover:bg-forest-200 dark:hover:bg-forest-800 transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
