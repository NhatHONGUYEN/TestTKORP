"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { AnimalDetailContent } from "@/features/animals/components/animal-detail";

export default function AnimalDetailPage({
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

  return <AnimalDetailContent id={id} />;
}
