import Link from "next/link";
export function Header() {
  return (
    <header className="bg-background text-white flex items-center justify-start sticky top-0 z-10 p-s h-header">
      <Link href="/">
        <div className="flex items-center justify-start gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
            <span className="text-white font-extrabold text-xl">s</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-app-text text-base">
            splitter
          </h1>
        </div>
      </Link>
    </header>
  );
}
