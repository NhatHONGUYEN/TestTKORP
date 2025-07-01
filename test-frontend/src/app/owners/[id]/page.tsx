"use client";

import { useGetOwnerById } from "@/hooks/api/owners/useGetOwnerById";
import { notFound } from "next/navigation";
import { use } from "react";
import { Mail, Phone } from "lucide-react";
import {
  OwnerDetailHeader,
  OwnerDetailAvatar,
  OwnerDetailInfoCard,
  OwnerAnimalsSection,
} from "@/features/owners/components/owner-detail";
import { BackButton } from "@/components/common";

// Import the loading component
import OwnerDetailLoading from "./loading";

function OwnerDetailContent({ id }: { id: number }) {
  const { owner, isLoading, error } = useGetOwnerById(id);

  if (isLoading) {
    return <OwnerDetailLoading />;
  }
  if (error) throw error;
  if (!owner) notFound();

  return (
    <section className="py-32 max-w-4xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <BackButton href="/owners">Back to owners</BackButton>

        {/* En-tête */}
        <OwnerDetailHeader owner={owner} />

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Avatar */}
          <OwnerDetailAvatar
            ownerId={owner.id}
            ownerName={`${owner.firstName} ${owner.lastName}`}
          />

          {/* Right information */}
          <div className="lg:w-2/3 space-y-8">
            {/* Contact information */}
            <div className="space-y-4">
              <OwnerDetailInfoCard
                icon={Mail}
                title="Email"
                value={owner.email}
              />

              {owner.phoneNumber && (
                <OwnerDetailInfoCard
                  icon={Phone}
                  title="Phone"
                  value={owner.phoneNumber}
                />
              )}
            </div>

            {/* Animals */}
            <OwnerAnimalsSection owner={owner} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id);

  // Vérifier si l'ID est valide (nombre entre 1 et 1000)
  if (isNaN(id) || id < 1 || id > 1000) {
    notFound();
  }

  return <OwnerDetailContent id={id} />;
}
