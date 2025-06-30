"use client";

import OwnersHeader from "@/features/owners/components/owners/OwnersHeader";
import OwnersListSection from "@/features/owners/components/owners/OwnersListSection";

export default function OwnersPage() {
  return (
    <section className="py-32 max-w-5xl mx-auto">
      <OwnersHeader />
      <OwnersListSection />
    </section>
  );
}
