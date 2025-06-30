/**
 * Détermine si un élément de navigation est actif basé sur le pathname actuel
 */
export const isActiveNavItem = (pathname: string, link: string): boolean => {
  if (link === "/") return pathname === "/";
  return pathname.startsWith(link);
};

/**
 * Génère les classes CSS pour un élément de navigation desktop
 */
export const getNavItemClasses = (isActive: boolean): string => {
  const baseClasses =
    "relative cursor-pointer text-sm font-medium hover:bg-transparent transition-colors";
  return `${baseClasses} ${
    isActive ? "text-foreground" : "text-muted-foreground hover:text-primary"
  }`;
};

/**
 * Génère les classes CSS pour un élément de navigation mobile
 */
export const getMobileNavItemClasses = (isActive: boolean): string => {
  const baseClasses =
    "text-foreground flex items-center border-l-[3px] px-6 py-4 text-sm font-medium transition-all duration-75";
  return `${baseClasses} ${
    isActive
      ? "border-primary text-foreground"
      : "text-muted-foreground hover:text-foreground border-transparent"
  }`;
};
