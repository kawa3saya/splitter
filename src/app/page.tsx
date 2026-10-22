import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturesCarousel } from "@/app/_components/features-carousel";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-content bg-gradient-to-b from-background to-white">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 size-72 rounded-full bg-blue-300/30 blur-3xl" />

      {/* the column keeps its phone width on wider screens: max-w-md minus the
          px-l padding leaves 24rem, the same width as the carousel below */}
      <div className="relative mx-auto flex w-full max-w-md flex-col gap-s px-l py-l">
        {/* hero copy */}
        <div className="flex flex-col gap-s">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Split expenses
            <br />
            easily and <span className="text-primary">fairly</span>.
          </h1>
          <p className="max-w-md text-base font-medium text-gray-500">
            Track group spending, split across currencies, and settle up in
            seconds — no sign-up required.
          </p>
        </div>

        {/* how it works */}
        <FeaturesCarousel />

        {/* call to action */}
        <div className="flex flex-col gap-xs">
          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-2xl text-lg font-bold shadow-xl shadow-primary/30"
          >
            <Link href="/trips/new">
              Create a new trip <ArrowRight className="size-5" />
            </Link>
          </Button>
          <p className="text-center text-sm font-medium text-gray-500">
            Free to use · No account needed
          </p>
        </div>
      </div>
    </div>
  );
}
