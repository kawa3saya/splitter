"use client";

import { UsersRound, CreditCard, Calculator } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FEATURES = [
  {
    icon: UsersRound,
    label: "Create a new trip",
  },
  {
    icon: CreditCard,
    label: "Add expenses",
  },
  {
    icon: Calculator,
    label: "Calculate settlements",
  },
] as const;

export function FeaturesCarousel() {
  return (
    <Carousel
      opts={{ align: "center", loop: true }}
      className="w-[80%] max-w-[min(100%,24rem)]"
    >
      <CarouselContent className="-ml-2 md:-ml-4 pb-s">
        {FEATURES.map(({ icon: Icon, label }) => (
          <CarouselItem
            key={label}
            className="pl-3 md:pl-4 basis-[85%] shrink-0"
          >
            <div className="flex flex-col items-center justify-center gap-xs h-40 border-primary rounded-xl p-s bg-base shadow-md">
              <Icon className="w-10 h-10" />
              <p className="text-base font-bold">{label}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" bg-base border-none shadow-lg" />
      <CarouselNext className=" bg-base border-none shadow-lg" />
    </Carousel>
  );
}
