import SectionHeading from "./SectionHeading";
import TerminalWindow from "./TerminalWindow";
import LiveDuration from "./LiveDuration";
import { personal, education, ltmJoinDate, careerStartDate } from "@/data/portfolio";

const neofetch: [string, string][] = [
  ["OS", "Homo Sapiens 21.6"],
  ["Host", personal.location],
  ["Kernel", "Python 3.x"],
  ["Role", personal.role],
  ["Current", "GenAI Python Developer @ LTIMindtree"],
  ["Languages", "Python, SQL, JavaScript"],
  ["Interests", "Application Architecture, Sci-fi, Travel"],
];

const swatchColors = [
  "bg-red",
  "bg-green",
  "bg-amber",
  "bg-cyan",
  "bg-pink",
  "bg-muted",
  "bg-text",
  "bg-border",
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-24 scroll-mt-20">
      <SectionHeading index="01" command="cat about.txt" title="About Me" />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <TerminalWindow title="about.txt">
          <p className="text-sm leading-relaxed text-text sm:text-base">{personal.summary}</p>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            I enjoy turning ambiguous problems into clean, reliable systems - whether that&apos;s
            an LLM-powered document pipeline, a business rule engine deciding loan eligibility, or
            a bit of internal tooling that saves a team hours every week. Currently exploring the
            intersection of traditional backend engineering and applied GenAI.
          </p>

          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted">Education</p>
            <ul className="space-y-2 text-sm">
              {education.map((e) => (
                <li key={e.degree} className="flex justify-between gap-4">
                  <span>
                    <span className="text-text">{e.degree}</span>
                    <span className="text-muted"> - {e.school}</span>
                  </span>
                  <span className="shrink-0 text-cyan">{e.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </TerminalWindow>

        <TerminalWindow title="neofetch">
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-green">{personal.githubUser}@vivekrawal</p>
            <p className="text-muted">{"-".repeat(22)}</p>
            {neofetch.map(([k, v]) => (
              <p key={k}>
                <span className="text-cyan">{k}</span>
                <span className="text-muted">: </span>
                <span className="text-text">{v}</span>
              </p>
            ))}
            <p>
              <span className="text-cyan">Total Experience</span>
              <span className="text-muted">: </span>
              <LiveDuration since={careerStartDate} className="text-green" />
            </p>
            <p>
              <span className="text-cyan">Uptime@LTM</span>
              <span className="text-muted">: </span>
              <LiveDuration since={ltmJoinDate} className="text-green" />
            </p>
            <div className="mt-4 flex gap-1.5">
              {swatchColors.map((c) => (
                <span key={c} className={`h-4 w-4 rounded-sm ${c}`} />
              ))}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
