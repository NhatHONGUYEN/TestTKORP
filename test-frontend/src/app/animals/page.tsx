"use client";

import { AnimalsHeader, AnimalsListSection } from "@/features/animals";

export default function AnimalsPage() {
  return (
    <section className="py-32 max-w-5xl mx-auto">
      <AnimalsHeader />
      <AnimalsListSection />
    </section>
  );
}
