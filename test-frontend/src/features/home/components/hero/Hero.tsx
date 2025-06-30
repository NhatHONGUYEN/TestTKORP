import { ArrowUpRight, PawPrint, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroProps } from "./hero.types";

export default function Hero({
  badge,
  heading,
  description,
  buttons,
  image,
}: HeroProps) {
  return (
    <section className="min-h-[82vh] flex items-center mt-[8vh]">
      <div className="container max-w-5xl mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <Link
                    href={buttons.primary.url}
                    className="flex items-center gap-2"
                  >
                    <PawPrint className="size-4" />
                    {buttons.primary.text}
                  </Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link
                    href={buttons.secondary.url}
                    className="flex items-center gap-2"
                  >
                    <Users className="size-4" />
                    {buttons.secondary.text}
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <Image
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
