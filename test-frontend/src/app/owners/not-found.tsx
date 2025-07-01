import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function OwnersNotFound() {
  return (
    <section className="min-h-[82vh] flex items-center mt-[8vh]">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <div className="flex flex-col items-center justify-center">
          {/* Lost person image */}
          <div className="mb-8 relative">
            <div className="size-32 mx-auto relative">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                alt="Person searching"
                width={128}
                height={128}
                quality={100}
                className="size-32 rounded-full object-cover border-4 border-gray-200"
              />
              <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white">
                Not found
              </Badge>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">Owner not found</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Sorry, the owner you are looking for does not exist or has been
            deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/owners">
                <ArrowLeft className="size-4 mr-2" />
                Back to owners
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
      </div>
    </section>
  );
}
