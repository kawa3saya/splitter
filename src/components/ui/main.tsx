"use client";

import { usePathname } from "next/navigation";

export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <main
      className={
        isHome
          ? "min-h-content"
          : "min-h-[calc(100dvh-var(--spacing-header))]"
      }
    >
      {children}
    </main>
  );
}
