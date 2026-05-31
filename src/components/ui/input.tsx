import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-14 w-full min-w-0 resize-none overflow-hidden rounded-lg border border-gray bg-base p-[15px] text-base font-normal leading-normal outline-none transition-[color,box-shadow]",
        "text-[var(--text-color-base)]",
        "placeholder:text-gray-500",
        "focus:border-primary focus:outline-0 focus:ring-[4px] focus:ring-background",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "selection:bg-gray selection:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
