import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Page not found</h1>
        <p className="mt-3 text-[var(--muted)]">The page may have moved during the WordPress to Next.js migration.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white">
          Back to home
        </Link>
      </Container>
    </section>
  );
}
