"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import LiveDuration from "./LiveDuration";
import { experience, personal } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-24 scroll-mt-20">
      <SectionHeading index="02" command="git log --oneline --graph" title="Experience" />

      <div className="relative ml-3 space-y-10 border-l border-border pl-8 sm:ml-6 sm:pl-10">
        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative"
          >
            <span
              className={`absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border sm:-left-[49px] ${
                job.current
                  ? "border-green bg-green/20 text-green"
                  : "border-border bg-panel text-muted"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${job.current ? "bg-green" : "bg-muted"}`} />
            </span>

            <div className="rounded-lg border border-border bg-panel/60 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <span className="text-amber">commit {job.hash}</span>
                {job.current && (
                  <span className="rounded-full border border-green/40 bg-green/10 px-2 py-0.5 text-green">
                    HEAD -&gt; current
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-muted">
                Author: {personal.name} &lt;{personal.email}&gt;
              </p>
              <p className="font-mono text-xs text-muted">
                Date: {job.duration}
                <span className="text-border"> · </span>
                <LiveDuration
                  since={job.startDate}
                  until={job.endDate}
                  showClock={job.current}
                  className={job.current ? "text-green" : "text-cyan"}
                />
              </p>

              <h3 className="mt-3 text-lg font-semibold text-text sm:text-xl">
                {job.role} <span className="text-muted">@</span>{" "}
                <span className="text-cyan">{job.company}</span>
              </h3>
              <p className="mt-0.5 text-xs text-muted">{job.location}</p>

              <ul className="mt-4 space-y-2 text-sm text-text/90">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1 text-green">+</span>
                    <span className={b.startsWith("(Placeholder") ? "italic text-muted" : ""}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {job.projects && (
                <div className="mt-5 border-t border-border pt-4">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted">
                    Key Projects ({job.projects.length})
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {job.projects.map((p) => (
                      <div key={p.name} className="rounded border border-border/70 p-3">
                        <p className="text-sm font-medium text-text">{p.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
