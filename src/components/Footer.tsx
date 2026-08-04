import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
        <p>
          <span className="text-green">$</span> echo &quot;© {new Date().getFullYear()}{" "}
          {personal.name}&quot;
        </p>
        <p>
          Designed &amp; built from scratch <span className="text-green">::</span> all rights
          reserved
        </p>
      </div>
    </footer>
  );
}
