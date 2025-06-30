import { OwnersHeader, OwnersListSection } from "@/features/owners";

export default function OwnersPage() {
  return (
    <section className="py-32 max-w-5xl mx-auto">
      <OwnersHeader />
      <OwnersListSection />
    </section>
  );
}
