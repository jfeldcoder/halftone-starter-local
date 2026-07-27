/**
 * Gentle fade + rise on load. Pure CSS, so content is visible without JS and
 * fully crawlable — safe as a default wrapper. For scroll-tied motion in a real
 * build, reach for framer-motion (already installed) with whileInView.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
