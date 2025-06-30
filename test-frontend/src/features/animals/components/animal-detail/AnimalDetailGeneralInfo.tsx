import { PawPrint } from "lucide-react";
import { Animal } from "@/types/animal.type";

interface AnimalDetailGeneralInfoProps {
  animal: Animal;
}

export default function AnimalDetailGeneralInfo({
  animal,
}: AnimalDetailGeneralInfoProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <PawPrint className="size-5 text-primary" />
        General information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-accent/30 rounded-lg">
          <p className="font-medium text-sm text-muted-foreground">Species</p>
          <p className="font-semibold">{animal.species}</p>
        </div>
        <div className="p-4 bg-accent/30 rounded-lg">
          <p className="font-medium text-sm text-muted-foreground">Race</p>
          <p className="font-semibold">{animal.breed}</p>
        </div>
      </div>
    </div>
  );
}
