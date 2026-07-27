"use client";

import { useEffect, useState } from "react";
import { site, bookHref } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const external = bookHref.startsWith("http");
  const bookProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="display text-lg font-extrabold text-fg">
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
          <a
            href={bookHref}
            {...bookProps}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dark"
          >
            Book now
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative h-10 w-10 md:hidden"
        >
          <span
            className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-fg transition-transform"
            style={{ transform: open ? "translate(-50%,-50%) rotate(45deg)" : "translate(-50%,-6px)" }}
          />
          <span
            className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-fg transition-transform"
            style={{ transform: open ? "translate(-50%,-50%) rotate(-45deg)" : "translate(-50%,4px)" }}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {site.nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display py-2 text-2xl font-extrabold text-fg"
              >
                {l.label}
              </a>
            ))}
            <a
              href={bookHref}
              {...bookProps}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-fit rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent"
            >
              Book now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
