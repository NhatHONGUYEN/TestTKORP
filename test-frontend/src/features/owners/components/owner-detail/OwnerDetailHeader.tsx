import { Owner } from "@/types/owner.type";

interface OwnerDetailHeaderProps {
  owner: Owner;
}

export default function OwnerDetailHeader({ owner }: OwnerDetailHeaderProps) {
  return (
    <div className="mb-12">
      <p className="semibold text-primary">Owner Profile</p>
      <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
        {owner.firstName} {owner.lastName}
      </h1>
      <p className="text-muted-foreground lg:text-xl">
        Owner of {owner.animals.length}{" "}
        {owner.animals.length > 1 ? "animals" : "animal"}
      </p>
    </div>
  );
}
