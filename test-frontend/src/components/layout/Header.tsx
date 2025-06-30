"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NAV_LOGO = {
  url: "/",
  title: "PetKeeper",
};

const NAV_ITEMS = [
  { name: "Accueil", link: "/" },
  { name: "Propriétaires", link: "/owners" },
  { name: "Animaux", link: "/animals" },
];

export const Header = () => {
  const [activeItem, setActiveItem] = useState(NAV_ITEMS[0].name);

  return (
    <header className="bg-background border-b border-border h-[8vh] fixed w-full top-0 z-50">
      <nav className="h-full mx-auto max-w-7xl">
        <div className="flex h-full items-center justify-between">
          {/* Logo et nom de l'entreprise */}
          <Link
            href={NAV_LOGO.url}
            className="flex items-center"
            onClick={() => setActiveItem("Accueil")}
          >
            <span className="text-2xl font-bold text-primary tracking-tighter">
              {NAV_LOGO.title}
            </span>
          </Link>

          {/* Navigation principale - Desktop */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="rounded-4xl flex items-center gap-6 px-8 py-3 relative">
              {NAV_ITEMS.map((item) => (
                <React.Fragment key={item.name}>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.link}
                        data-nav-item={item.name}
                        onClick={() => setActiveItem(item.name)}
                        className={`relative cursor-pointer text-sm font-medium hover:bg-transparent transition-colors ${
                          activeItem === item.name
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Menu mobile */}
          <div className="flex items-center gap-4">
            <MobileNav activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
        </div>
      </nav>
    </header>
  );
};

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative h-6 w-6">
      <div className="absolute inset-0">
        <Menu
          className={`text-muted-foreground group-hover:text-foreground absolute transition-all duration-300 ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <X
          className={`text-muted-foreground group-hover:text-foreground absolute transition-all duration-300 ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

const MobileNav = ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block md:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="p-2 rounded-md hover:bg-muted">
            <AnimatedHamburger isOpen={isOpen} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative -left-4 -top-4 block w-screen max-w-md overflow-hidden rounded-xl p-0 md:hidden"
        >
          <ul className="bg-background text-foreground w-full py-4">
            {NAV_ITEMS.map((navItem, idx) => (
              <li key={idx}>
                <Link
                  href={navItem.link}
                  onClick={() => {
                    setActiveItem(navItem.name);
                    setIsOpen(false);
                  }}
                  className={`text-foreground flex items-center border-l-[3px] px-6 py-4 text-sm font-medium transition-all duration-75 ${
                    activeItem === navItem.name
                      ? "border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground border-transparent"
                  }`}
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
