"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { OwnerDetailContent } from "@/features/owners/components/owner-detail";

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
