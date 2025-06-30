import Link from "next/link";
import { LogoConfig } from "./types/navigation.types";
import { PawPrint } from "lucide-react";

interface LogoProps {
  config: LogoConfig;
  onLogoClick?: () => void;
}

export default function Logo({ config, onLogoClick }: LogoProps) {
  return (
    <Link href={config.url} className="flex items-center" onClick={onLogoClick}>
      <div className="flex items-center gap-1">
        <PawPrint className="h-6 w-6 text-primary" />
        <span className="text-2xl font-bold text-primary tracking-tighter">
          {config.title}
        </span>
      </div>
    </Link>
  );
}
