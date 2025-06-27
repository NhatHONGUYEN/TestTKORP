"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo et nom de l'entreprise */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">PetKeeper</span>
            </Link>
          </div>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Accueil
            </Link>
            <Link href="/owners" className="text-gray-700 hover:text-gray-900">
              Propriétaires
            </Link>
            <Link href="/animals" className="text-gray-700 hover:text-gray-900">
              Animaux
            </Link>
          </div>

          {/* Bouton de connexion */}
          <div className="hidden md:flex items-center">
            <Link href="/">
              <Button variant="outline">RECHERCHER</Button>
            </Link>
          </div>

          {/* Menu burger - Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/produits"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Accueil
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Propriétaires
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Animaux
              </Link>
              <button className="w-full mt-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Se connecter
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
