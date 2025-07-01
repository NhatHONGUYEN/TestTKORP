import Link from "next/link";
import { LogoConfig } from "./types/navigation.types";
import { PawPrint } from "lucide-react";

interface LogoProps {
  config: LogoConfig;
  onLogoClick?: () => void;
}

export default function Logo({ config, onLogoClick }: LogoProps) {
  return (
    <Link
      href={config.url}
      className="flex items-center touch-manipulation"
      onClick={onLogoClick}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <PawPrint className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        <span className="text-xl sm:text-2xl font-bold text-primary tracking-tighter">
          {config.title}
        </span>
      </div>
    </Link>
  );
}
