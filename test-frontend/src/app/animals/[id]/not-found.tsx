import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AnimalNotFound() {
  return (
    <section className="min-h-[82vh] flex items-center mt-[8vh]">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        {/* Lost dog image */}
        <div className="mb-8 relative">
          <div className="size-32 mx-auto relative">
            <Image
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face"
              alt="Lost dog"
              width={128}
              height={128}
              quality={100}
              className="size-32 rounded-full object-cover border-4 border-gray-200"
            />
            <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white">
              Lost
            </Badge>
          </div>
        </div>

        {/* Title and description */}
        <h1 className="text-3xl font-bold mb-4">Animal not found</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Sorry, this animal does not exist or has been deleted.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/animals">
              <ArrowLeft className="size-4 mr-2" />
              Back to animals
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="size-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
