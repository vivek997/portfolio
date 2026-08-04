"use client";

import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiChevronDown } from "react-icons/fi";
import { personal, socials } from "@/data/portfolio";
import Terminal from "./Terminal";
import WebcamPhoto from "./WebcamPhoto";

const iconFor = (icon: string) => {
  switch (icon) {
    case "github":
      return <FiGithub />;
    case "linkedin":
      return <FiLinkedin />;
    default:
      return <FiMail />;
  }
};

function useTypewriter(text: string, speed = 45, startDelay = 900) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return output;
}

export default function Hero() {
  const typed = useTypewriter(personal.tagline);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-5 pt-24 pb-16"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="flex items-start gap-4 sm:gap-6">
            <WebcamPhoto src="/avatar.jpg" alt={`Photo of ${personal.name}`} />
            <div className="min-w-0 pt-1">
              <p className="mb-3 font-mono text-sm text-green">
                <span className="text-muted">$</span> whoami
              </p>

              <h1
                data-text={personal.name}
                className="glitch hero-name text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {personal.name}
              </h1>

              <p className="mt-3 text-base text-muted sm:text-lg">
                <span className="text-cyan">{personal.role}</span>
                <br className="sm:hidden" />
                <span className="mx-2 hidden text-border sm:inline">|</span>
                <span>{personal.location}</span>
              </p>
            </div>
          </div>

          <p className="mt-6 h-7 font-mono text-base text-green-bright sm:text-lg">
            {typed}
            <span className="animate-blink">_</span>
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            {personal.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded border border-green bg-green/10 px-5 py-2.5 text-sm font-medium text-green transition-colors hover:bg-green/20"
            >
              view_projects()
            </a>
            <a
              href="#contact"
              className="rounded border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-cyan hover:text-cyan"
            >
              get_in_touch()
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded border border-border text-lg text-muted transition-colors hover:border-green hover:text-green"
              >
                {iconFor(s.icon)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <Terminal />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-green sm:flex"
      >
        <span className="text-xs">scroll</span>
        <FiChevronDown className="animate-bounce" />
      </a>
    </section>
  );
}
