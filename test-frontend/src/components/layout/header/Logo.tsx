import Link from "next/link";
import { LogoConfig } from "./types/navigation.types";

interface LogoProps {
  config: LogoConfig;
  onLogoClick?: () => void;
}

export default function Logo({ config, onLogoClick }: LogoProps) {
  return (
    <Link href={config.url} className="flex items-center" onClick={onLogoClick}>
      <span className="text-2xl font-bold text-primary tracking-tighter">
        {config.title}
      </span>
    </Link>
  );
}
