"use client";

import { useEffect, useState } from "react";
import { personal, resumeRequestUrl } from "@/data/portfolio";

const links = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 text-sm">
        <a href="#top" className="flex items-center gap-2 font-semibold text-text">
          <span className="text-green">~</span>
          <span>vivek@rawal</span>
          <span className="text-muted">:</span>
          <span className="text-cyan">~</span>
          <span className="text-muted">$</span>
          <span className="ml-0.5 h-4 w-2 bg-green animate-blink" />
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group flex items-center gap-1 rounded px-3 py-1.5 text-muted transition-colors hover:text-green"
              >
                <span className="text-green opacity-0 transition-opacity group-hover:opacity-100">
                  ./
                </span>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.resumeAvailable ? personal.resumeUrl : resumeRequestUrl}
              target={personal.resumeAvailable ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="ml-2 rounded border border-green/40 px-3 py-1.5 text-green transition-colors hover:bg-green/10"
            >
              {personal.resumeAvailable ? "resume.pdf" : "request resume"}
            </a>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 p-2 text-green"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 px-5 pb-4">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-2 py-2 text-muted hover:text-green"
                >
                  <span className="text-green">./</span>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={personal.resumeAvailable ? personal.resumeUrl : resumeRequestUrl}
                target={personal.resumeAvailable ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 inline-block rounded border border-green/40 px-3 py-1.5 text-green"
              >
                {personal.resumeAvailable ? "resume.pdf" : "request resume"}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
