"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/portfolio";

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-24 scroll-mt-20">
      <SectionHeading index="03" command="ls -la ./projects" title="Projects" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            whileHover={{ y: -4 }}
            className={`group flex flex-col overflow-hidden rounded-lg border bg-panel/60 transition-colors ${
              p.featured ? "border-green/40" : "border-border"
            } hover:border-green/60`}
          >
            <div className="flex items-center gap-2 border-b border-border bg-panel-alt px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
              <span className="ml-2 truncate font-mono text-xs text-muted">
                {slug(p.name)}.py
              </span>
              {p.featured && (
                <span className="ml-auto shrink-0 rounded-full border border-green/40 bg-green/10 px-2 py-0.5 text-[10px] text-green">
                  featured
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-semibold text-text sm:text-lg">{p.name}</h3>
              <p className="mt-1 text-xs text-muted">{p.company}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text/80">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border bg-panel px-2 py-0.5 font-mono text-[11px] text-cyan"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
