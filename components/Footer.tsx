import { site } from "@/lib/site";

const SOCIALS = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
] as const;

export default function Footer() {
  const socials = SOCIALS.filter((s) => site.socials[s.key]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-elev">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="display text-xl font-extrabold text-fg">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-fg-muted">{site.description}</p>
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">{site.address}</p>
          {site.phone && (
            <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`} className="mt-2 block text-sm text-fg-muted hover:text-fg">
              {site.phone}
            </a>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`} className="mt-1 block text-sm font-medium text-accent hover:text-accent-dark">
              {site.email}
            </a>
          )}
        </div>

        <div>
          <p className="eyebrow">Hours</p>
          <ul className="mt-4 space-y-1.5 text-sm text-fg-muted">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-6">
                <span>{h.day}</span>
                <span className="text-fg">{h.time}</span>
              </li>
            ))}
          </ul>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={site.socials[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-page flex items-center justify-between border-t border-line py-6 text-xs text-fg-faint">
        <span>
          © {year} {site.name}
        </span>
        <span>
          Built by{" "}
          <a href={site.builtBy.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            {site.builtBy.label}
          </a>
        </span>
      </div>
    </footer>
  );
}
