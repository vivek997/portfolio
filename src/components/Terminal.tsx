"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import {
  personal,
  skills,
  projects,
  experience,
  resumeRequestUrl,
  ltmJoinDate,
  careerStartDate,
} from "@/data/portfolio";
import DraggableTerminalWindow from "./DraggableTerminalWindow";
import { formatClock, formatYearsMonths } from "@/lib/duration";
import { applyTheme, isThemeName, THEME_ORDER, nextTheme, getStoredTheme } from "@/lib/theme";
import { playKeyClick, primeAudio } from "@/lib/sound";

type Line = { id: number; kind: "input" | "output"; node: ReactNode };

let idCounter = 0;
const nextId = () => idCounter++;

const SOUND_STORAGE_KEY = "terminal-sound";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Prompt = ({ user = "guest" }: { user?: string }) => (
  <span className="whitespace-nowrap">
    <span className="text-green">{user}</span>
    <span className="text-muted">@vivekrawal</span>
    <span className="text-muted">:</span>
    <span className="text-cyan">~</span>
    <span className="text-muted">$</span>
  </span>
);

const bootSequence: ReactNode[] = [
  <>vivekrawal.in v2.0 -- booting portfolio kernel...</>,
  <>
    <span className="text-green">[ OK ]</span> loading modules: python, django, fastapi, aws,
    genai
  </>,
  <>
    <span className="text-green">[ OK ]</span> establishing secure session
  </>,
  <>
    <span className="text-green">[ OK ]</span> mounting /home/{personal.githubUser}
  </>,
  <>
    Welcome. Type <span className="text-cyan">help</span> to see available commands.
  </>,
];

const HELP_ROWS: [string, string][] = [
  ["help", "show this list of commands"],
  ["about", "who is Vivek?"],
  ["experience", "print work history"],
  ["projects", "list featured projects"],
  ["skills", "list technical skills"],
  ["contact", "how to reach me"],
  ["resume", "open resume.pdf"],
  ["github / linkedin", "open my profiles"],
  ["whoami", "identify current user"],
  ["uptime", "time since joining LTIMindtree"],
  ["theme [green|amber|cyan]", "switch the CRT color mode"],
  ["ls", "list portfolio sections"],
  ["sudo hire-me", "??? try it"],
  ["clear", "clear the terminal"],
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pushLine = (kind: Line["kind"], node: ReactNode) => {
    setLines((prev) => [...prev, { id: nextId(), kind, node }]);
  };

  useEffect(() => {
    let mounted = true;
    let cumulative = 200;
    bootSequence.forEach((node, i) => {
      cumulative += i === 0 ? 150 : 380;
      setTimeout(() => {
        if (mounted) pushLine("output", node);
      }, cumulative);
    });
    setTimeout(() => {
      if (mounted) setBooted(true);
    }, cumulative + 200);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    // Sound defaults to on for new visitors; only override it when the
    // visitor previously muted it explicitly (respect their saved choice).
    const stored = window.localStorage.getItem(SOUND_STORAGE_KEY);
    if (stored === "off") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSoundOn(false);
    }
  }, []);

  const toggleSound = () => {
    primeAudio();
    setSoundOn((prev) => {
      const next = !prev;
      window.localStorage.setItem(SOUND_STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  };

  const commands: Record<string, (args: string[]) => ReactNode[] | "CLEAR"> = {
    help: () => [
      <div key="h" className="space-y-1">
        <div className="text-muted">Available commands:</div>
        {HELP_ROWS.map(([cmd, desc]) => (
          <div key={cmd} className="grid grid-cols-[minmax(180px,auto)_1fr] gap-2">
            <span className="text-green">{cmd}</span>
            <span className="text-muted">{desc}</span>
          </div>
        ))}
      </div>,
    ],
    whoami: () => [
      <span key="whoami">
        <span className="text-cyan">{personal.name}</span> -- {personal.role}, {personal.location}
      </span>,
    ],
    about: () => {
      scrollToSection("about");
      return [
        <span key="summary">{personal.summary}</span>,
        <span key="hint" className="text-muted">
          -- scrolled to #about
        </span>,
      ];
    },
    experience: () => {
      scrollToSection("experience");
      return [
        ...experience.map((e) => (
          <div key={e.company}>
            <span className="text-amber">{e.duration.padEnd(20, " ")}</span>
            <span className="text-text">{e.role}</span> <span className="text-muted">@</span>{" "}
            <span className="text-cyan">{e.company}</span>
          </div>
        )),
        <span key="hint" className="text-muted">
          -- scrolled to #experience
        </span>,
      ];
    },
    exp: (a) => commands.experience(a),
    work: (a) => commands.experience(a),
    projects: () => {
      scrollToSection("projects");
      return [
        ...projects.map((p) => (
          <div key={p.name}>
            <span className="text-green">*</span> <span className="text-text">{p.name}</span>{" "}
            <span className="text-muted">[{p.tech.slice(0, 3).join(", ")}]</span>
          </div>
        )),
        <span key="hint" className="text-muted">
          -- scrolled to #projects
        </span>,
      ];
    },
    skills: () => {
      scrollToSection("skills");
      return [
        ...skills.map((s) => (
          <div key={s.category}>
            <span className="text-amber">{s.category}:</span>{" "}
            <span className="text-text">{s.skills.join(", ")}</span>
          </div>
        )),
        <span key="hint" className="text-muted">
          -- scrolled to #skills
        </span>,
      ];
    },
    contact: () => {
      scrollToSection("contact");
      return [
        <span key="email">
          email: <span className="text-cyan">{personal.email}</span>
        </span>,
        <span key="github">
          github: <span className="text-cyan">{personal.github}</span>
        </span>,
        <span key="linkedin">
          linkedin: <span className="text-cyan">{personal.linkedin}</span>
        </span>,
        <span key="hint" className="text-muted">
          -- scrolled to #contact
        </span>,
      ];
    },
    resume: () => {
      if (typeof window === "undefined") return [];
      if (personal.resumeAvailable) {
        window.open(personal.resumeUrl, "_blank", "noopener,noreferrer");
        return [
          <span key="resume" className="text-green">
            Opening resume.pdf...
          </span>,
        ];
      }
      window.location.href = resumeRequestUrl;
      return [
        <span key="resume" className="text-amber">
          Resume isn&apos;t posted publicly yet -- opening an email draft to request it.
        </span>,
      ];
    },
    github: () => {
      if (typeof window !== "undefined")
        window.open(personal.github, "_blank", "noopener,noreferrer");
      return [
        <span key="github" className="text-green">
          Opening GitHub...
        </span>,
      ];
    },
    linkedin: () => {
      if (typeof window !== "undefined")
        window.open(personal.linkedin, "_blank", "noopener,noreferrer");
      return [
        <span key="linkedin" className="text-green">
          Opening LinkedIn...
        </span>,
      ];
    },
    uptime: () => {
      const now = new Date();
      return [
        <span key="ltm">
          LTIMindtree tenure: <span className="text-green">{formatYearsMonths(ltmJoinDate, now)}</span>{" "}
          <span className="text-muted">
            ({formatClock(ltmJoinDate, now)}) -- since 15 Jan 2026
          </span>
        </span>,
        <span key="total">
          Total experience:{" "}
          <span className="text-green">{formatYearsMonths(careerStartDate, now)}</span>{" "}
          <span className="text-muted">
            ({formatClock(careerStartDate, now)}) -- since Sep 2019
          </span>
        </span>,
      ];
    },
    theme: (args) => {
      const requested = args[0]?.toLowerCase();
      const current = getStoredTheme();
      const target = requested
        ? isThemeName(requested)
          ? requested
          : null
        : nextTheme(current);

      if (!target) {
        return [
          <span key="theme-err" className="text-red">
            unknown theme &quot;{requested}&quot;. Try: {THEME_ORDER.join(", ")}
          </span>,
        ];
      }
      applyTheme(target);
      return [
        <span key="theme-ok">
          CRT mode set to <span className="text-green">{target}</span>
        </span>,
      ];
    },
    ls: () => [
      <div key="ls" className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1">
        {["about.txt", "experience/", "projects/", "skills.json", "contact.sh", "resume.pdf"].map(
          (f) => (
            <span key={f} className={f.endsWith("/") ? "text-cyan" : "text-text"}>
              {f}
            </span>
          )
        )}
      </div>,
    ],
    date: () => [<span key="date">{new Date().toString()}</span>],
    pwd: () => [<span key="pwd">/home/{personal.githubUser}/portfolio</span>],
    echo: (args) => [<span key="echo">{args.join(" ")}</span>],
    sudo: (args) => {
      if (args.join(" ") === "hire-me") {
        return [
          <span key="1" className="text-green">
            [sudo] permission granted.
          </span>,
          <span key="2">Initiating hiring sequence for {personal.name}...</span>,
          <span key="3" className="text-cyan">
            Reach out: {personal.email}
          </span>,
        ];
      }
      return [
        <span key="denied" className="text-red">
          Permission denied. Nice try though.
        </span>,
      ];
    },
    clear: () => "CLEAR",
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    pushLine(
      "input",
      <span>
        <Prompt /> <span>{raw}</span>
      </span>
    );
    if (!trimmed) return;

    setHistory((h) => [...h, raw]);
    setHistoryIdx(null);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const handler = commands[cmd.toLowerCase()];
    if (!handler) {
      pushLine(
        "output",
        <span>
          command not found: <span className="text-red">{cmd}</span>. Type{" "}
          <span className="text-cyan">help</span>.
        </span>
      );
      return;
    }
    const result = handler(args);
    if (result === "CLEAR") {
      setLines([]);
      return;
    }
    result.forEach((node) => pushLine("output", node));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (soundOn && !["Shift", "Control", "Alt", "Meta", "Tab", "CapsLock"].includes(e.key)) {
      playKeyClick();
    }
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setValue(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(null);
        setValue("");
      } else {
        setHistoryIdx(idx);
        setValue(history[idx]);
      }
    }
  };

  return (
    <DraggableTerminalWindow
      title="guest@vivekrawal -- -zsh -- 80x24"
      headerExtra={
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute keyboard sounds" : "Unmute keyboard sounds"}
          title={soundOn ? "Keyboard sounds: on" : "Keyboard sounds: off"}
          className="text-muted transition-colors hover:text-green"
        >
          {soundOn ? <FiVolume2 size={13} /> : <FiVolumeX size={13} />}
        </button>
      }
    >
      <div
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
        className="h-full overflow-y-auto text-[13px] sm:text-sm leading-relaxed cursor-text"
      >
        {lines.map((l) => (
          <div key={l.id} className={l.kind === "output" ? "text-text/90 pl-0" : ""}>
            {l.node}
          </div>
        ))}

        {booted && (
          <div className="flex items-center gap-2">
            <Prompt />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent outline-none border-none text-text caret-green"
              aria-label="Terminal input"
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </DraggableTerminalWindow>
  );
}
