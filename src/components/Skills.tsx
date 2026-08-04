"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TerminalWindow from "./TerminalWindow";
import { skills, personal } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-5 py-24 scroll-mt-20">
      <SectionHeading index="04" command="pip install -r requirements.txt" title="Skills" />

      <TerminalWindow title="requirements.txt">
        <div className="mb-6 font-mono text-xs text-muted sm:text-sm">
          <p>
            <span className="text-green">Collecting</span> vivek-rawal==
            {personal.yearsExperience}.0.0
          </p>
          <p>
            <span className="text-green">Successfully installed</span> {personal.yearsExperience}
            +-years-experience python-expert genai-enthusiast cloud-native
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <p className="mb-2.5 font-mono text-xs text-muted">
                <span className="text-cyan">#</span> {cat.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-panel-alt px-2.5 py-1 font-mono text-xs text-text transition-colors hover:border-green hover:text-green"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
