"use client";

import { useState, type FormEvent } from "react";
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import TerminalWindow from "./TerminalWindow";
import { personal } from "@/data/portfolio";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-24 scroll-mt-20">
      <SectionHeading index="05" command="./contact.sh --reach-out" title="Get In Touch" />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <TerminalWindow title="contact_info.json">
          <p className="mb-4 text-sm text-muted sm:text-base">
            Open to interesting conversations, collaborations, and opportunities. My inbox is
            always open.
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 text-text transition-colors hover:text-green"
              >
                <FiMail className="shrink-0 text-cyan" /> {personal.email}
              </a>
            </li>
            <li>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text transition-colors hover:text-green"
              >
                <FiGithub className="shrink-0 text-cyan" /> github.com/{personal.githubUser}
              </a>
            </li>
            <li>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text transition-colors hover:text-green"
              >
                <FiLinkedin className="shrink-0 text-cyan" /> linkedin.com/in/vivek-rawal
              </a>
            </li>
            <li className="flex items-center gap-3 text-text">
              <FiMapPin className="shrink-0 text-cyan" /> {personal.location}
            </li>
          </ul>
        </TerminalWindow>

        <TerminalWindow title="send_message.py">
          <form onSubmit={onSubmit} className="space-y-4 text-sm">
            <div>
              <label className="mb-1 block text-muted">
                <span className="text-green">&gt;</span> name =
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='"Jane Doe"'
                className="w-full rounded border border-border bg-panel-alt px-3 py-2 text-text outline-none placeholder:text-muted/60 focus:border-green"
              />
            </div>
            <div>
              <label className="mb-1 block text-muted">
                <span className="text-green">&gt;</span> email =
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='"jane@example.com"'
                className="w-full rounded border border-border bg-panel-alt px-3 py-2 text-text outline-none placeholder:text-muted/60 focus:border-green"
              />
            </div>
            <div>
              <label className="mb-1 block text-muted">
                <span className="text-green">&gt;</span> message =
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let's build something..."
                className="w-full resize-none rounded border border-border bg-panel-alt px-3 py-2 text-text outline-none placeholder:text-muted/60 focus:border-green"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded border border-green bg-green/10 px-5 py-2.5 font-medium text-green transition-colors hover:bg-green/20"
            >
              {sent ? "opening mail client..." : "send_message()"}
            </button>
            <p className="text-xs text-muted">
              This opens your email client with the message pre-filled - nothing is stored on a
              server.
            </p>
          </form>
        </TerminalWindow>
      </div>
    </section>
  );
}
