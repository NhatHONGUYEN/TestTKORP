import { Skeleton } from "@/components/ui/skeleton";

export default function OwnersLoading() {
  return (
    <section className="py-32 max-w-5xl mx-auto">
      <div className="container mx-auto flex flex-col items-start text-left">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-12 w-96 mb-4" />
        <Skeleton className="h-6 w-full max-w-3xl" />
      </div>

      {/* Skeleton des cartes de propriétaires */}
      <div className="container mx-auto px-4 mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row p-4 rounded-lg">
            <Skeleton className="mb-4 aspect-square w-full shrink-0 sm:mr-5 sm:mb-0 sm:size-48 rounded-lg" />
            <div className="flex flex-1 flex-col space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton pagination */}
      <div className="container mx-auto px-4 mt-16 flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </section>
  );
}
