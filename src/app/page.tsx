import Link from "next/link";

const demos = [
  {
    title: "Zustand",
    accent: "State",
    withHref: "/zustand",
    withoutHref: "/no-zustand",
    extraHref: "/zustand-2",
    extraLabel: "Contoh cart store",
    manualExtraHref: "/no-zustand-2",
    manualExtraLabel: "Contoh cart manual",
    summary: "Bandingkan global store yang ringkas dengan state lokal komponen.",
  },
  {
    title: "TanStack Query",
    accent: "Server data",
    withHref: "/tanstack",
    withoutHref: "/no-tanstack",
    extraHref: null,
    extraLabel: null,
    manualExtraHref: null,
    manualExtraLabel: null,
    summary: "Lihat bedanya query cache, loading state, dan error handling bawaan.",
  },
  {
    title: "Zod",
    accent: "Validation",
    withHref: "/zod/create",
    withoutHref: "/no-zod/create",
    extraHref: null,
    extraLabel: null,
    manualExtraHref: null,
    manualExtraLabel: null,
    summary: "Validasi schema deklaratif dibanding validasi manual per field.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffffff_0,#f7f7f2_42%,#ebe7da_100%)] px-5 py-8 text-[#151513] sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <nav className="flex items-center justify-between border-b border-[#dedbd0] pb-5">
          <Link
            href="/"
            className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[#2563eb]"
          >
            Next Demo Lab
          </Link>
          <div className="hidden items-center gap-2 text-sm text-[#68645b] sm:flex">
            <span className="rounded-full border border-[#dedbd0] bg-white px-3 py-1">
              Zustand
            </span>
            <span className="rounded-full border border-[#dedbd0] bg-white px-3 py-1">
              TanStack
            </span>
            <span className="rounded-full border border-[#dedbd0] bg-white px-3 py-1">
              Zod
            </span>
          </div>
        </nav>

        <header className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="space-y-6">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[#b45309]">
              Materi demo frontend
            </p>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[#151513] sm:text-6xl">
                Demo yang rapi untuk membandingkan library dan versi manual.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#57534a]">
                Pilih satu materi, lalu buka versi dengan library dan tanpa
                library. Semua route dibuat sebagai layar praktik, bukan
                halaman marketing, supaya enak dipakai saat mengajar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-[#dedbd0] bg-white shadow-sm">
            {[
              ["3", "library"],
              ["8", "route"],
              ["1", "alur demo"],
            ].map(([value, label]) => (
              <div key={label} className="border-r border-[#dedbd0] p-5 last:border-r-0">
                <p className="font-mono text-4xl font-semibold text-[#2563eb]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-[#68645b]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          {demos.map((demo, index) => (
            <article
              key={demo.title}
              className="flex min-h-[320px] flex-col justify-between rounded-lg border border-[#dedbd0] bg-white p-6 shadow-sm"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-[#2563eb]">
                    0{index + 1}
                  </span>
                  <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#1d4ed8]">
                    {demo.accent}
                  </span>
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold">{demo.title}</h2>
                  <p className="leading-7 text-[#57534a]">{demo.summary}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <Link
                  href={demo.withHref}
                  className="flex h-12 items-center justify-between rounded-md bg-[#151513] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[#2563eb]"
                >
                  <span>Dengan {demo.title}</span>
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                <Link
                  href={demo.withoutHref}
                  className="flex h-12 items-center justify-between rounded-md border border-[#dedbd0] bg-[#f7f7f2] px-4 text-sm font-semibold text-[#151513] hover:border-[#2563eb] hover:text-[#1d4ed8]"
                >
                  <span>Tanpa {demo.title}</span>
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                {demo.extraHref && demo.extraLabel ? (
                  <Link
                    href={demo.extraHref}
                    className="flex h-12 items-center justify-between rounded-md border border-[#dedbd0] bg-white px-4 text-sm font-semibold text-[#151513] hover:border-[#2563eb] hover:text-[#1d4ed8]"
                  >
                    <span>{demo.extraLabel}</span>
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                ) : null}
                {demo.manualExtraHref && demo.manualExtraLabel ? (
                  <Link
                    href={demo.manualExtraHref}
                    className="flex h-12 items-center justify-between rounded-md border border-[#dedbd0] bg-white px-4 text-sm font-semibold text-[#151513] hover:border-[#b45309] hover:text-[#92400e]"
                  >
                    <span>{demo.manualExtraLabel}</span>
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
