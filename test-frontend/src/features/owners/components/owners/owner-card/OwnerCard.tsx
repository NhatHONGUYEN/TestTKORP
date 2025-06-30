import Link from "next/link";
import Image from "next/image";
import { Mail, PawPrint, Heart } from "lucide-react";
import { getOwnerAvatar } from "@/lib/avatars";
import { Owner } from "@/types/owner.type";

export interface OwnerCardProps {
  owner: Owner;
}

export default function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <Link
      href={`/owners/${owner.id}`}
      className="flex flex-col sm:flex-row group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200"
    >
      <div className="mb-4 aspect-square w-full shrink-0 overflow-clip sm:mr-5 sm:mb-0 sm:size-48 rounded-lg transition-all duration-300 group-hover:scale-105">
        <Image
          src={getOwnerAvatar(owner.id)}
          alt={`${owner.firstName} ${owner.lastName}`}
          className="w-full h-full object-cover"
          quality={100}
          width={192}
          height={192}
        />
      </div>

      <div className="flex flex-1 flex-col items-start">
        <h2 className="w-full text-left font-semibold text-lg group-hover:text-primary transition-colors">
          {owner.firstName} {owner.lastName}
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Mail className="size-4" />
          <span>{owner.email}</span>
        </div>

        <div className="w-full py-3">
          <div className="flex items-center gap-2 mb-2">
            <PawPrint className="size-4 text-primary" />
            <span className="font-medium">
              Animals ({owner.animals.length})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {owner.animals.map((animal) => (
              <div
                key={animal.id}
                className="flex items-center gap-2 bg-background/50 p-2 rounded border border-border/50 group-hover:border-primary/20 transition-colors"
              >
                <Heart className="size-3 text-red-500" />
                <div>
                  <p className="font-medium text-sm">{animal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {animal.species} • {animal.breed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
