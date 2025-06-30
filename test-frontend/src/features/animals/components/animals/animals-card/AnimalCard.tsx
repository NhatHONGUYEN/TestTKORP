import Link from "next/link";
import Image from "next/image";
import { Scale, Palette, User } from "lucide-react";
import { getAnimalAvatar } from "@/lib/avatars";
import { Animal } from "@/types/animal.type";

export interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Link
      href={`/animals/${animal.id}`}
      className="flex flex-col sm:flex-row group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200"
    >
      <div className="mb-4 aspect-square w-full shrink-0 overflow-clip sm:mr-5 sm:mb-0 sm:size-48 rounded-lg transition-all duration-300 group-hover:scale-105">
        <Image
          src={getAnimalAvatar(animal.id)}
          alt={animal.name}
          width={192}
          height={192}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col items-start">
        <h2 className="w-full text-left font-semibold text-lg group-hover:text-primary transition-colors">
          {animal.name}
        </h2>
        <p className="w-full text-left text-muted-foreground font-medium">
          {animal.species} • {animal.breed}
        </p>

        <div className="w-full py-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Palette className="size-4" />
            <span>Couleur: {animal.color}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Scale className="size-4" />
            <span>Poids: {animal.weight} kg</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="size-4" />
            <span>
              Propriétaire: {animal.owner.firstName} {animal.owner.lastName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
