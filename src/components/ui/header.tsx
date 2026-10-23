import Link from "next/link";
export function Header() {
  return (
    <header className="bg-background/30 backdrop-blur-md text-white flex items-center justify-start sticky top-0 z-10 p-s h-header">
      <Link href="/">
        <div className="flex items-center justify-start gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
            <span className="text-white font-extrabold text-xl">s</span>
          </div>
          {/* The site name is not a heading: every page keeps its own <h1>. */}
          <span className="text-xl font-extrabold tracking-tight text-app-text text-base">
            Seppaaan
          </span>
        </div>
      </Link>
    </header>
  );
}
