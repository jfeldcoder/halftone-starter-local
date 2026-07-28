/**
 * Renders a schema.org JSON-LD block. Server component — the script is in the
 * initial HTML so crawlers see it without running JS.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
