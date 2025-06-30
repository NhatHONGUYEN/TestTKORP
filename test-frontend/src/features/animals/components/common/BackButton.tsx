import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function BackButton({ href, children }: BackButtonProps) {
  return (
    <Button asChild className="mb-8">
      <Link href={href} className="inline-flex items-center gap-2">
        <ArrowLeft className="size-4" />
        {children}
      </Link>
    </Button>
  );
}
