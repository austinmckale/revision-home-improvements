import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

type BottomCTAProps = {
  title?: string;
  description?: string;
  showFinancing?: boolean;
  links?: Array<{ href: string; label: string }>;
  className?: string;
};

export default function BottomCTA({
  title = "Ready to start your project?",
  description = "Call for a quick conversation about your project, or send your details for a written scope and quote.",
  showFinancing = true,
  links = [],
  className = "",
}: BottomCTAProps) {
  return (
    <section className={`py-14 ${className}`}>
      <Container>
        <div className="surface rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-extrabold text-[var(--accent)]">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">{description}</p>
          {showFinancing && (
            <p className="mt-3 text-sm font-semibold text-[var(--brand)]">
              {siteConfig.financing.teaser}
            </p>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="/request-a-quote">Request a Quote</Button>
            <Button href={siteConfig.phoneHref} variant="secondary">
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
          {links.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="font-semibold text-[var(--brand)]">
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
