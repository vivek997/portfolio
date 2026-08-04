"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

type Size = { width: number; height: number };
type Pos = { x: number; y: number };

const DEFAULT_SIZE: Size = { width: 480, height: 380 };
const MIN_SIZE: Size = { width: 280, height: 200 };
const MAX_WIDTH = 720;
const MAX_HEIGHT = 640;

export default function DraggableTerminalWindow({
  title,
  headerExtra,
  children,
}: {
  title: string;
  headerExtra?: ReactNode;
  children: ReactNode;
}) {
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [shake, setShake] = useState(false);

  const dragOrigin = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);
  const resizeOrigin = useRef<{ px: number; py: number; w: number; h: number } | null>(null);

  const isCustomized =
    pos.x !== 0 ||
    pos.y !== 0 ||
    size.width !== DEFAULT_SIZE.width ||
    size.height !== DEFAULT_SIZE.height ||
    maximized ||
    minimized;

  const onDragPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (maximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragOrigin.current = { px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y };
    setDragging(true);
  };
  const onDragPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || !dragOrigin.current) return;
    setPos({
      x: dragOrigin.current.ox + (e.clientX - dragOrigin.current.px),
      y: dragOrigin.current.oy + (e.clientY - dragOrigin.current.py),
    });
  };
  const endDrag = () => {
    setDragging(false);
    dragOrigin.current = null;
  };

  const onResizePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeOrigin.current = { px: e.clientX, py: e.clientY, w: size.width, h: size.height };
    setResizing(true);
  };
  const onResizePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!resizing || !resizeOrigin.current) return;
    const dx = e.clientX - resizeOrigin.current.px;
    const dy = e.clientY - resizeOrigin.current.py;
    setSize({
      width: Math.min(MAX_WIDTH, Math.max(MIN_SIZE.width, resizeOrigin.current.w + dx)),
      height: Math.min(MAX_HEIGHT, Math.max(MIN_SIZE.height, resizeOrigin.current.h + dy)),
    });
  };
  const endResize = () => {
    setResizing(false);
    resizeOrigin.current = null;
  };

  const resetWindow = () => {
    setPos({ x: 0, y: 0 });
    setSize(DEFAULT_SIZE);
    setMaximized(false);
    setMinimized(false);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const width = maximized ? "min(720px, 94vw)" : `${size.width}px`;
  const height = minimized ? 44 : maximized ? 560 : size.height;

  return (
    <div
      className={`relative mx-auto ${shake ? "animate-shake" : ""}`}
      style={{
        width,
        maxWidth: "100%",
        transform: maximized ? undefined : `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        zIndex: dragging || resizing ? 30 : 10,
        transition: dragging || resizing ? "none" : "width 0.2s ease, transform 0.15s ease",
      }}
    >
      <div
        className="terminal-shadow flex flex-col overflow-hidden rounded-lg border border-border bg-panel/90 backdrop-blur-sm"
        style={{ height, transition: dragging || resizing ? "none" : "height 0.2s ease" }}
      >
        <div
          onPointerDown={onDragPointerDown}
          onPointerMove={onDragPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`flex shrink-0 items-center gap-2 border-b border-border bg-panel-alt px-4 py-2.5 select-none touch-none ${
            maximized ? "cursor-default" : dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <button
            type="button"
            aria-label="Close (just for show)"
            title="This is a portfolio, not a real OS. Nice try."
            onClick={triggerShake}
            className="h-3 w-3 shrink-0 rounded-full bg-red/80 transition hover:brightness-125"
          />
          <button
            type="button"
            aria-label={minimized ? "Restore window" : "Minimize window"}
            onClick={() => setMinimized((m) => !m)}
            className="h-3 w-3 shrink-0 rounded-full bg-amber/80 transition hover:brightness-125"
          />
          <button
            type="button"
            aria-label={maximized ? "Restore window" : "Maximize window"}
            onClick={() => setMaximized((m) => !m)}
            className="h-3 w-3 shrink-0 rounded-full bg-green/80 transition hover:brightness-125"
          />
          <span className="ml-3 truncate text-xs text-muted select-none">{title}</span>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            {headerExtra}
            {isCustomized && (
              <button
                type="button"
                onClick={resetWindow}
                className="text-[10px] text-muted transition-colors hover:text-green"
              >
                reset
              </button>
            )}
          </div>
        </div>

        {!minimized && <div className="min-h-0 flex-1 p-4 sm:p-6">{children}</div>}
      </div>

      {!maximized && !minimized && (
        <div
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={endResize}
          onPointerCancel={endResize}
          role="separator"
          aria-label="Resize terminal window"
          aria-orientation="horizontal"
          className="absolute bottom-0.5 right-0.5 h-4 w-4 cursor-nwse-resize touch-none text-muted/60 hover:text-green"
        >
          <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
            <path
              d="M13 3 3 13M13 8 8 13M13 13h.01"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
