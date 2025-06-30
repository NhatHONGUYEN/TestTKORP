"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AnimatedHamburger from "./AnimatedHamburger";
import { NavItem } from "./types/navigation.types";
import { isActiveNavItem, getMobileNavItemClasses } from "./utils";

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
            {items.map((navItem, idx) => {
              const isActive = isActiveNavItem(pathname, navItem.link);

              return (
                <li key={idx}>
                  <Link
                    href={navItem.link}
                    onClick={() => setIsOpen(false)}
                    className={getMobileNavItemClasses(isActive)}
                  >
                    {navItem.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
