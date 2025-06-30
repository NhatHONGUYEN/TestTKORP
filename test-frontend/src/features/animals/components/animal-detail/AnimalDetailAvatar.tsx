import Image from "next/image";
import { getAnimalAvatar } from "@/lib/avatars";

interface AnimalDetailAvatarProps {
  animalId: number;
  animalName: string;
}

export default function AnimalDetailAvatar({
  animalId,
  animalName,
}: AnimalDetailAvatarProps) {
  return (
    <div className="lg:w-1/3">
      <div className="aspect-square w-full rounded-lg overflow-hidden">
        <Image
          src={getAnimalAvatar(animalId)}
          alt={animalName}
          width={400}
          height={400}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
