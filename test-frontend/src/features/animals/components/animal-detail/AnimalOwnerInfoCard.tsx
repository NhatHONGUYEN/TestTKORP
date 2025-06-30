import Link from "next/link";
import Image from "next/image";
import { User, Mail } from "lucide-react";
import { getOwnerAvatar } from "@/lib/avatars";

interface AnimalOwnerInfoCardProps {
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
  };
}

export default function AnimalOwnerInfoCard({
  owner,
}: AnimalOwnerInfoCardProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <User className="size-5 text-primary" />
        Owner
      </h2>
      <Link
        href={`/owners/${owner.id}`}
        className="block group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200 border border-border/50 hover:border-primary/20"
      >
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-lg overflow-hidden">
            <Image
              src={getOwnerAvatar(owner.id)}
              alt={`${owner.firstName} ${owner.lastName}`}
              width={64}
              height={64}
              quality={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {owner.firstName} {owner.lastName}
            </h3>
            {owner.email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Mail className="size-4" />
                <span>{owner.email}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
