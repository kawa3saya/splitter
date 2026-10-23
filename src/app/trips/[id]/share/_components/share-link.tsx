"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheckBig, Copy } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteUrl } from "@/constants/site";

export function ShareLink({ tripId }: { tripId: string }) {
  const [copied, setCopied] = useState(false);
  // Was read straight from process.env with an empty-string fallback, which
  // made the copied link a bare "/trips/<id>" whenever the var was unset.
  const tripUrl = siteUrl(`/trips/${tripId}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(tripUrl);
    setCopied(true);
  };

  return (
    <div className="flex flex-col gap-l w-full items-center">
      <CircleCheckBig className="size-16 text-primary" />
      <div>
        <h1 className="text-xl font-bold">Trip created successfully</h1>
        <p>Share the trip with your friends</p>
      </div>
      <Field>
        <FieldLabel>Shareable Link</FieldLabel>
        <div className="flex flex-col md:flex-row gap-2 justify-start">
          <Input
            value={tripUrl}
            readOnly
            className="cursor-pointer"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="cursor-pointer max-w-32 shadow-lg"
                variant="outline"
                onClick={handleCopy}
              >
                <Copy className="size-4" /> {copied ? "Copied" : "Copy"}
              </Button>
            </TooltipTrigger>
            <TooltipContent hidden={copied}>
              <p> Copy</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <FieldDescription>
          Anyone with this link can view and add expenses to this trip
        </FieldDescription>
      </Field>
      <Button asChild className="w-fit font-bold" size="lg">
        <Link href={`/trips/${tripId}`}>
          <ArrowRight className="size-6" /> View Trip
        </Link>
      </Button>
    </div>
  );
}
