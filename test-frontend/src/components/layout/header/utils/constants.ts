import { NavItem, LogoConfig } from "../types/navigation.types";

export const NAV_LOGO: LogoConfig = {
  url: "/",
  title: "PetKeeper",
};

export const NAV_ITEMS: NavItem[] = [
  { name: "Accueil", link: "/" },
  { name: "Propriétaires", link: "/owners" },
  { name: "Animaux", link: "/animals" },
];
