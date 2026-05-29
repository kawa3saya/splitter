"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Footer() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <footer className="bg-background text-white flex items-center justify-start fixed bottom-0 left-0 right-0 p-s h-footer">
      <div>
        <Button variant="link" asChild className="underline">
          <Link href="/terms">Terms of Service</Link>
        </Button>
        <Button variant="link" asChild className="underline">
          <Link href="/privacy">Privacy Policy</Link>
        </Button>
      </div>
    </footer>
  );
}
