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
    <header className="h-[8vh] fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md ">
      <nav className="h-full">
        <div className="flex h-full mx-auto max-w-7xl items-center justify-between ">
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

          {/* Spacer pour pousser la navigation à droite */}
          <div className="flex-1"></div>

          {/* Navigation principale - Desktop à droite */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="flex items-center gap-6">
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
          <div className="flex items-center gap-4 ml-auto">
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
    <div className="block lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="p-2 rounded-md hover:bg-muted">
            <AnimatedHamburger isOpen={isOpen} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative -left-4 -top-4 block w-screen max-w-md overflow-hidden rounded-xl p-0 lg:hidden"
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
