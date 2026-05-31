"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="flex items-center justify-center gap-s p-s text-sm text-gray-500">
      <Link href="/terms" className="underline">
        Terms of Service
      </Link>
      <Link href="/privacy" className="underline">
        Privacy Policy
      </Link>
    </div>
  );
}
