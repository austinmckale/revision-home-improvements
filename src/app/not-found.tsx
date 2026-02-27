import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export default function NotFound() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Page Not Found</h1>
        <p className="mt-3 text-[var(--muted)]">
          This page does not exist. Here are some places to start:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/services">Browse Services</Button>
          <Button href="/projects" variant="secondary">See Our Work</Button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/" className="font-semibold text-[var(--brand)]">Home</Link>
          <Link href="/request-a-quote" className="font-semibold text-[var(--brand)]">Request a Quote</Link>
          <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">
            Call {siteConfig.phoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
