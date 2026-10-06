/** Drafting-style dimension line: a measured rule with end ticks and an optional centered label. */
export default function DimensionLine({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`dimension-line ${className}`} aria-hidden="true">
      <span className="dimension-line__rule" />
      {label ? <span className="dimension-line__label annotation">{label}</span> : null}
      <span className="dimension-line__rule" />
    </div>
  );
}
