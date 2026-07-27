import { site, bookHref } from "@/lib/site";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";

function BookButton({ className = "" }: { className?: string }) {
  const external = bookHref.startsWith("http");
  return (
    <a
      href={bookHref}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dark ${className}`}
    >
      Book an appointment
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="border-b border-line">
        <div className="container-page py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">{site.name}</p>
            <h1 className="display mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] text-fg sm:text-7xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{site.description}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BookButton />
              <a href="#services" className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-fg">
                See services
              </a>
              {site.rating && (
                <span className="text-sm text-fg-muted">
                  <span className="font-semibold text-fg">{site.rating.stars}★</span>{" "}
                  {site.rating.count} {site.rating.source} reviews
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services menu */}
      <section id="services" className="border-b border-line">
        <div className="container-page py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">Menu</p>
            <h2 className="display mt-4 text-3xl font-extrabold text-fg sm:text-4xl">Services</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            {site.services.map((group, gi) => (
              <Reveal key={group.group} delay={(gi % 2) * 0.06}>
                <h3 className="eyebrow text-accent">{group.group}</h3>
                <ul className="mt-4">
                  {group.items.map((it) => (
                    <li
                      key={it.name}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                    >
                      <div>
                        <span className="text-fg">{it.name}</span>
                        {"note" in it && it.note && (
                          <span className="ml-2 text-xs text-fg-faint">{it.note}</span>
                        )}
                      </div>
                      {"price" in it && it.price && (
                        <span className="shrink-0 text-sm font-medium text-fg-muted">{it.price}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <BookButton />
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      {site.reviews.length > 0 && (
        <section id="reviews" className="border-b border-line bg-bg-elev">
          <div className="container-page py-20 sm:py-28">
            <Reveal>
              <p className="eyebrow">Loved by clients</p>
              <h2 className="display mt-4 text-3xl font-extrabold text-fg sm:text-4xl">
                {site.rating ? `${site.rating.stars}★ across ${site.rating.count} reviews` : "What clients say"}
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {site.reviews.map((r, i) => (
                <Reveal key={r.name} delay={(i % 3) * 0.06}>
                  <figure className="h-full rounded-2xl border border-line bg-bg p-7">
                    <div className="text-accent">★★★★★</div>
                    <blockquote className="mt-4 text-fg leading-relaxed">“{r.quote}”</blockquote>
                    <figcaption className="mt-4 text-sm text-fg-faint">{r.name}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visit — hours, location, inquiry form */}
      <section id="visit" className="border-b border-line">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Visit</p>
            <h2 className="display mt-4 text-3xl font-extrabold text-fg sm:text-4xl">
              Book your appointment.
            </h2>
            <p className="mt-4 max-w-md text-fg-muted">
              Request a time below and we will confirm, or call us directly.
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="eyebrow">Location</dt>
                <dd className="mt-1.5 text-fg-muted">
                  <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                    {site.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Hours</dt>
                <dd className="mt-1.5">
                  <ul className="space-y-1 text-sm text-fg-muted">
                    {site.hours.map((h) => (
                      <li key={h.day} className="flex max-w-xs justify-between gap-6">
                        <span>{h.day}</span>
                        <span className="text-fg">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Contact</dt>
                <dd className="mt-1.5 text-sm text-fg-muted">
                  <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-fg">
                    {site.phone}
                  </a>
                  {" · "}
                  <a href={`mailto:${site.email}`} className="text-accent hover:text-accent-dark">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.05}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
