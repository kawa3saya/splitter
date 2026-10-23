"use client";

import { useEffect, useState } from "react";
import {
  Plane,
  UserPlus,
  Plus,
  Check,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const FLOAT = "animate-[float_6s_ease-in-out_infinite]";

const MEMBERS = ["A", "M", "R"];

const EXPENSES = [
  { emoji: "🍜", label: "Dinner", who: "Alex", amount: "¥8,000" },
  { emoji: "🏨", label: "Hotel", who: "Mia", amount: "€120" },
  { emoji: "🚕", label: "Taxi", who: "You", amount: "$24" },
];

const SETTLEMENTS = [
  { from: "A", to: "You", amount: "¥3,000" },
  { from: "You", to: "M", amount: "€15" },
];

export function FeaturesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="mx-auto w-full max-w-sm"
      >
        <CarouselContent>
          {/* 1. Create a trip & add friends */}
          <CarouselItem>
            <div className="relative flex h-60 items-center justify-center">
              <div className="absolute h-40 w-60 -rotate-6 rounded-2xl border border-white/50 bg-primary/20 backdrop-blur-sm" />
              <div
                className={cn(
                  FLOAT,
                  "relative h-40 w-60 -rotate-6 rounded-2xl bg-gradient-to-br from-primary to-blue-400 p-s text-white shadow-2xl shadow-primary/30"
                )}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      New trip
                    </span>
                    <Plane className="size-5 opacity-80" />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold leading-tight">
                      Tokyo Trip
                    </p>
                    <p className="text-xs opacity-80">Base currency · JPY 🇯🇵</p>
                  </div>
                  <div className="flex items-center gap-xs">
                    <div className="flex -space-x-2">
                      {MEMBERS.map((m) => (
                        <span
                          key={m}
                          className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs font-bold"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold opacity-80">
                      3 members
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute right-8 top-6 flex size-11 animate-bounce items-center justify-center rounded-full bg-white shadow-lg">
                <UserPlus className="size-5 text-primary" />
              </div>
            </div>
          </CarouselItem>

          {/* 2. Log expenses in any currency */}
          <CarouselItem>
            <div className="relative flex h-60 items-center justify-center">
              <div className="absolute size-48 rounded-full bg-primary/5 blur-2xl" />
              <div
                className={cn(
                  FLOAT,
                  "relative w-64 rounded-2xl border border-white/70 bg-white/80 p-s shadow-xl backdrop-blur-md"
                )}
              >
                <p className="mb-xs text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Recent expenses
                </p>
                <div className="flex flex-col gap-xs">
                  {EXPENSES.map(({ emoji, label, who, amount }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-xs">
                        <span className="text-lg">{emoji}</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold leading-tight">
                            {label}
                          </span>
                          <span className="text-[10px] font-medium text-gray-400">
                            Paid by {who}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold">{amount}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-6 right-8 flex size-11 animate-bounce items-center justify-center rounded-full bg-primary text-white shadow-lg">
                <Plus className="size-5" />
              </div>
            </div>
          </CarouselItem>

          {/* 3. Settle up fairly */}
          <CarouselItem>
            <div className="relative flex h-60 items-center justify-center">
              <div className="absolute h-40 w-60 rotate-6 rounded-2xl border border-white/50 bg-primary/20 backdrop-blur-sm" />
              <div
                className={cn(
                  FLOAT,
                  "relative h-40 w-60 rotate-3 rounded-2xl bg-gradient-to-br from-primary to-blue-400 p-s text-white shadow-2xl shadow-primary/30"
                )}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      Settle up
                    </span>
                    <ArrowLeftRight className="size-5 opacity-80" />
                  </div>
                  <div className="flex flex-col gap-xxs">
                    {SETTLEMENTS.map(({ from, to, amount }) => (
                      <div
                        key={`${from}-${to}`}
                        className="flex items-center justify-between rounded-lg bg-white/15 px-xs py-xxs backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-xxs text-xs font-bold">
                          <span className="flex size-6 items-center justify-center rounded-full bg-white/30 text-[10px]">
                            {from}
                          </span>
                          <ArrowRight className="size-3 opacity-70" />
                          <span>{to}</span>
                        </div>
                        <span className="text-sm font-extrabold">{amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-8 flex size-12 animate-bounce items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-4 ring-white/40">
                <Check className="size-6" />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* pagination dots — shows how many slides remain */}
      <div className="mt-xs flex justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === current ? "w-6 bg-primary" : "w-2 bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
