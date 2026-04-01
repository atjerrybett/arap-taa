'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, TreePine, Users, Home, Info, Search, CalendarDays } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { ViewAsSelector } from './ViewAsSelector';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tree', label: 'Full Tree', icon: TreePine },
  { href: '/people', label: 'People Directory', icon: Users },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/about', label: 'About', icon: Info },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-earth-50/95 dark:bg-earth-950/95 backdrop-blur-sm border-b border-earth-200 dark:border-earth-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25 transition-shadow">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-earth-900 dark:text-earth-100">
                  Arap Taa
                </h1>
                <p className="text-xs text-earth-600 dark:text-earth-400 -mt-1">
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-earth-700 dark:text-earth-300 hover:bg-earth-200 dark:hover:bg-earth-800 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search, View As & Mobile Menu */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <ViewAsSelector />
              </div>
              
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-earth-700 dark:text-earth-300 hover:bg-earth-200 dark:hover:bg-earth-800 transition-colors touch-manipulation"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-earth-700 dark:text-earth-300 hover:bg-earth-200 dark:hover:bg-earth-800 transition-colors touch-manipulation"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-earth-200 dark:border-earth-800">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-earth-700 dark:text-earth-300 hover:bg-earth-200 dark:hover:bg-earth-800 transition-colors"
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
