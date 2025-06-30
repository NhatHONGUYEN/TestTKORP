"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavItem } from "./types/navigation.types";
import { isActiveNavItem, getNavItemClasses } from "./utils";

interface DesktopNavProps {
  items: NavItem[];
}

export default function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="flex items-center gap-6">
        {items.map((item) => {
          const isActive = isActiveNavItem(pathname, item.link);

          return (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink asChild>
                <Link href={item.link} className={getNavItemClasses(isActive)}>
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
