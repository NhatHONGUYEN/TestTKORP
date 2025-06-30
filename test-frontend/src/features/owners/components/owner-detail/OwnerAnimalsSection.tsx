import Link from "next/link";
import { PawPrint, Heart } from "lucide-react";
import { Owner } from "@/types/owner.type";

interface OwnerAnimalsSectionProps {
  owner: Owner;
}

export default function OwnerAnimalsSection({
  owner,
}: OwnerAnimalsSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <PawPrint className="size-5 text-primary" />
        Animals ({owner.animals.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {owner.animals.map((animal) => (
          <Link
            key={animal.id}
            href={`/animals/${animal.id}`}
            className="group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200 border border-border/50 hover:border-primary/20"
          >
            <div className="flex items-center gap-3">
              <div className="size-12 bg-accent rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Heart className="size-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {animal.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {animal.species} • {animal.breed}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
