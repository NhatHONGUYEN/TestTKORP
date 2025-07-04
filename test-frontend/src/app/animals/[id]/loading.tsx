import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  PawPrint,
  Scale,
  Palette,
  Calendar,
  User,
} from "lucide-react";

export default function AnimalDetailLoading() {
  return (
    <section className="py-32 max-w-4xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Back button skeleton */}
        <div className="inline-flex items-center gap-2 mb-8">
          <ArrowLeft className="size-4 text-muted-foreground" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Header skeleton */}
        <div className="mb-12">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Avatar skeleton */}
          <div className="lg:w-1/3">
            <div className="aspect-square w-full bg-accent rounded-lg flex items-center justify-center">
              <PawPrint className="size-24 text-primary/60" />
            </div>
          </div>

          {/* Right information */}
          <div className="lg:w-2/3 space-y-8">
            {/* Basic information skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <Palette className="size-5 text-primary" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <Scale className="size-5 text-primary" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-12 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <Calendar className="size-5 text-primary" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            </div>

            {/* General information skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PawPrint className="size-5 text-primary" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/30 rounded-lg">
                  <Skeleton className="h-3 w-12 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="p-4 bg-accent/30 rounded-lg">
                  <Skeleton className="h-3 w-8 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            {/* Owner skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="size-5 text-primary" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-4">
                  <Skeleton className="size-16 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
