"use client";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { NAV_LOGO, NAV_ITEMS } from "./utils";

export const Header = () => {
  return (
    <header className="h-[8vh] fixed w-full top-0 z-50 bg-background/50 backdrop-blur-md ">
      <nav className="h-full">
        <div className="flex h-full mx-auto max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo config={NAV_LOGO} />
          <div className="flex-1" />
          <DesktopNav items={NAV_ITEMS} />
          <MobileNav items={NAV_ITEMS} />
        </div>
      </nav>
    </header>
  );
};
