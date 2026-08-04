# vivekrawal.in — Personal Portfolio

A terminal/hacker-themed portfolio site for Vivek Rawal, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The centerpiece is a real interactive, **draggable and resizable** terminal you can type commands into (`help`, `about`, `projects`, `theme cyan`, `uptime`, `sudo hire-me`, ...).

### Extra touches

- **Draggable/resizable terminal** — grab the title bar to move it, drag the bottom-right corner to resize, click the traffic-light dots to minimize/maximize (red one just shakes — it's not a real close button).
- **CRT theme switcher** — a small pill in the bottom-right corner (or the `theme` terminal command) cycles the accent color between green / amber / cyan CRT phosphor modes. Persists via `localStorage`.
- **Cursor trail** — a subtle glowing particle trail follows the mouse on desktop (disabled for touch devices and if the OS has "reduce motion" on).
- **Keyboard click sounds** — optional, synthesized on the fly with the Web Audio API (no audio files), muted by default. Toggle via the speaker icon in the terminal's title bar.
- **Live duration everywhere** — the About neofetch panel shows a live-ticking "Total Experience" (since `careerStartDate`, Sep 2019) and "Uptime@LTM" (since `ltmJoinDate`). The Experience timeline shows each job's total duration: a static "X years Y months" for completed roles (those with an `endDate`), and a live-ticking timer for the current role. The terminal's `uptime` command reports both. All computed from `careerStartDate`/`ltmJoinDate`/each job's `startDate`/`endDate` in `src/data/portfolio.ts` via `src/lib/duration.ts` — nothing hardcoded, so it stays accurate automatically.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Editing content

All of the résumé/portfolio content lives in one place:

```
src/data/portfolio.ts
```

Edit that file to update your bio, experience, projects, skills, education, and social links — every section and the interactive terminal both read from it, so you only need to update content once.

Notes on what's currently a placeholder:

- The **LTIMindtree / GenAI Python Developer** entry in `experience` has placeholder bullet points (marked with a comment) since the role is new — swap in real project details whenever you're ready.
- `public/resume.pdf` is your existing (outdated) resume PDF. Replace this file with an updated one at any time — the filename/path must stay `resume.pdf`, or update `personal.resumeUrl` in `portfolio.ts` if you rename it.
- The contact form uses a `mailto:` link (opens the visitor's email client) — no backend/API keys required. If you'd rather collect messages server-side later, swap the `onSubmit` handler in `src/components/Contact.tsx` for a service like Formspree, Resend, or EmailJS.

## Adding your photo (ASCII portrait)

The About section renders your photo as a live, colorized ASCII-art portrait next to a `neofetch`-style info panel (just like the real `neofetch` CLI tool). To wire it up:

1. Add an image at `public/avatar.jpg` (referenced from `src/components/About.tsx`). Any photo works — a transparent-background PNG gives the cleanest result, but `AsciiPortrait` also auto-detects plain light/white studio backgrounds (like a typical headshot) and inverts the density mapping so the backdrop still fades away instead of dominating the render.
2. That's it — `src/components/AsciiPortrait.tsx` loads it client-side, samples it onto a canvas, and maps brightness/color per cell to characters. No build step needed.
3. Until a photo exists at that path, the panel shows a small placeholder telling you exactly where to drop the file.
4. Tip: keep the source photo reasonably small (a few hundred KB, a few hundred px wide is plenty since it's downsampled onto a tiny character grid anyway) — a full-resolution photo straight from a phone/camera is unnecessary bytes over the wire.
4. Tune the look via props on `<AsciiPortrait />` in `src/components/About.tsx`: `cols` (detail level, default 46) and `cellAspect` (vertical stretch correction, default 0.55).

## Project structure

```
src/
  app/
    layout.tsx      # fonts, metadata, global chrome (scanlines/vignette)
    page.tsx         # assembles all sections
    globals.css      # theme colors, terminal effects (glitch, scanlines, grid)
  components/
    Nav.tsx          # sticky top nav
    Hero.tsx         # name, tagline, intro + the interactive Terminal
    Terminal.tsx      # the interactive terminal (boot sequence + commands)
    About.tsx        # bio + neofetch-style info card
    Experience.tsx    # git-log styled work history timeline
    Projects.tsx      # project cards
    Skills.tsx        # requirements.txt styled skills grid
    Contact.tsx       # contact info + mailto form
    Footer.tsx
    TerminalWindow.tsx # reusable "window chrome" wrapper (traffic-light dots)
    SectionHeading.tsx
  data/
    portfolio.ts      # <-- all editable content lives here
```

## Deploying to vivekrawal.in (Vercel)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo (Vercel auto-detects Next.js — no config needed).
3. Deploy. You'll get a `*.vercel.app` URL first.
4. In the Vercel project → **Settings → Domains**, add `vivekrawal.in` (and `www.vivekrawal.in` if you want both).
5. Vercel will show you DNS records to add at your domain registrar (usually an `A` record for the apex domain and a `CNAME` for `www`). Add those in your registrar's DNS settings.
6. Wait for DNS to propagate (usually minutes, sometimes longer) — Vercel will auto-provision SSL once it verifies the domain.

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for scroll-reveal animations
- [react-icons](https://react-icons.github.io/react-icons/) for social/contact icons
