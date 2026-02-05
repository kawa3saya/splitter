import Link from "next/link";
import { CircleDollarSign, CircleArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturesCarousel } from "@/app/_components/features-carousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start gap-10 p-l bg-gradient-to-b from-primary to-white">
      <p className="font-bold text-3xl text-white text-center sm:text-5xl text-shadow-lg">
        Split expenses
        <br />
        easily and fairly.
      </p>
      <CircleDollarSign className="w-20 h-20 text-white" />
      <Button
        asChild
        className="w-auto h-auto rounded-full font-bold px-s text-lg shadow-lg"
      >
        <Link href="/trips/new">
          Create a new trip <CircleArrowRight className="size-10 font-bold" />
        </Link>
      </Button>
      <div className="flex flex-col items-center justify-start gap-xs">
        <p className="text-l font-bold text-white text-center text-shadow-lg">
          What Do We Offer?
        </p>
        <FeaturesCarousel />
      </div>
    </div>
  );
}
