"use client";

import { OwnersHeader, OwnersListSection } from "@/features/owners/components";

export default function OwnersPage() {
  return (
    <section className="py-32 max-w-7xl mx-auto">
      <OwnersHeader />
      <OwnersListSection />
    </section>
  );
}
