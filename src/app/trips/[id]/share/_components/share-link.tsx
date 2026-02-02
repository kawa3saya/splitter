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

export function ShareLink({ tripId }: { tripId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/trips/${tripId}`);
    setCopied(true);
  };

  return (
    <div className="flex flex-col gap-m w-full items-center">
      <CircleCheckBig className="size-10 text-primary" />
      <div>
        <p className="text-xl font-bold">Trip created successfully</p>
        <p>Share the trip with your friends</p>
      </div>
      <Field>
        <FieldLabel>Shareable Link</FieldLabel>
        <div className="flex flex-col md:flex-row gap-2 justify-start">
          <Input
            value={`http://localhost:3000/trips/${tripId}`}
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
          <ArrowRight className="size-4" /> View Trip
        </Link>
      </Button>
    </div>
  );
}
