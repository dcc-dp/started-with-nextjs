import Link from "next/link";
import type { ReactNode } from "react";

type DemoShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  mode: "Dengan library" | "Tanpa library";
  children: ReactNode;
  notes: string[];
};

export function DemoShell({
  eyebrow,
  title,
  description,
  mode,
  children,
  notes,
}: DemoShellProps) {
  const isWithLibrary = mode === "Dengan library";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffffff_0,#f7f7f2_45%,#ebe7da_100%)] px-5 py-8 text-[#151513] sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <nav className="flex items-center justify-between border-b border-[#dedbd0] pb-5">
          <Link
            href="/"
            className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[#2563eb]"
          >
            Next Demo Lab
          </Link>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
              isWithLibrary
                ? "bg-[#dbeafe] text-[#1d4ed8]"
                : "bg-[#fff7ed] text-[#b45309]"
            }`}
          >
            {mode}
          </span>
        </nav>

        <header className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="space-y-4">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[#b45309]">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#57534a]">
              {description}
            </p>
          </div>

          <aside className="rounded-lg border border-[#dedbd0] bg-white p-5 shadow-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#68645b]">
              Fokus saat demo
            </p>
            <ul className="mt-4 space-y-3">
              {notes.map((note) => (
                <li key={note} className="flex gap-3 text-sm leading-6 text-[#57534a]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </aside>
        </header>

        {children}
      </section>
    </main>
  );
}

export function DemoCard({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-lg border border-[#dedbd0] bg-white p-5 shadow-sm sm:p-7">
      {children}
    </section>
  );
}
