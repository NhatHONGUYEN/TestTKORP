import Image from "next/image";
import { getOwnerAvatar } from "@/lib/avatars";

interface OwnerDetailAvatarProps {
  ownerId: number;
  ownerName: string;
}

export default function OwnerDetailAvatar({
  ownerId,
  ownerName,
}: OwnerDetailAvatarProps) {
  return (
    <div className="lg:w-1/3">
      <div className="aspect-square w-full rounded-lg overflow-hidden">
        <Image
          src={getOwnerAvatar(ownerId)}
          alt={ownerName}
          width={400}
          height={400}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
