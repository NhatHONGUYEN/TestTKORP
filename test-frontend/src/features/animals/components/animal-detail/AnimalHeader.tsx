import { Animal } from "@/types/animal.type";

interface AnimalHeaderProps {
  animal: Animal;
}

export default function AnimalHeader({ animal }: AnimalHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
        {animal.name}
      </h1>
      <p className="text-muted-foreground lg:text-xl">
        {animal.species} • {animal.breed}
      </p>
    </div>
  );
}
