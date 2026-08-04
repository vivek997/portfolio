import { ReactNode } from "react";

export default function TerminalWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`terminal-shadow rounded-lg border border-border bg-panel/90 backdrop-blur-sm overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-panel-alt px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red/80" />
        <span className="h-3 w-3 rounded-full bg-amber/80" />
        <span className="h-3 w-3 rounded-full bg-green/80" />
        <span className="ml-3 text-xs text-muted truncate select-none">{title}</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
