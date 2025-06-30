"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border h-[8vh] fixed w-full top-0 z-50">
      <nav className="h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full justify-between items-center">
          {/* Logo et nom de l'entreprise */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">PetKeeper</span>
            </Link>
          </div>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/owners"
              className="text-foreground hover:text-secondary transition-colors"
            >
              Propriétaires
            </Link>
            <Link
              href="/animals"
              className="text-foreground hover:text-primary transition-colors"
            >
              Animaux
            </Link>
          </div>

          {/* Bouton de recherche */}
          <div className="hidden md:flex items-center">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-background hover:bg-accent text-primary hover:text-accent-foreground"
              >
                RECHERCHER
              </Button>
            </Link>
          </div>

          {/* Menu burger - Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-primary hover:bg-muted"
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
          <div className="md:hidden bg-background border border-border shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-foreground hover:bg-muted hover:text-primary"
              >
                Accueil
              </Link>
              <Link
                href="/owners"
                className="block px-3 py-2 rounded-md text-foreground hover:bg-muted hover:text-secondary"
              >
                Propriétaires
              </Link>
              <Link
                href="/animals"
                className="block px-3 py-2 rounded-md text-foreground hover:bg-muted hover:text-primary"
              >
                Animaux
              </Link>
              <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                RECHERCHER
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
