"use client";

import { useState } from "react";
import { useGetOwners } from "@/hooks/api/owners/useGetOwners";
import { Pagination } from "@/components/common/Pagination";
import OwnerCard from "./owner-card/OwnerCard";

// Import the loading component
import OwnersLoading from "@/app/owners/loading";

export default function OwnersListSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { owners, meta, isLoading, error, refetch } = useGetOwners({
    page: currentPage,
  });

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    // Remonter en haut de la page
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      await refetch({ page, limit: 10 });
    } catch (err) {
      console.error("❌ Page change error:", err);
    }
  };

  if (isLoading) {
    return <OwnersLoading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="container px-6 mx-auto  mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {owners.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="container mx-auto px-4 mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={meta.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
