export default function SectionHeading({
  index,
  command,
  title,
}: {
  index: string;
  command: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="text-green">{index}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-cyan">
          <span className="text-muted">$</span> {command}
        </span>
      </div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-text">
        {title}
        <span className="text-green">.</span>
      </h2>
    </div>
  );
}
