import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Revision Home Improvements website and lead forms.",
};

export default function PrivacyPage() {
  return (
    <section className="py-14">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">Privacy Policy</h1>
        <p className="mt-4 text-[var(--muted)]">
          We use your submitted information only to respond to your request, provide estimates, and coordinate project
          communication. We do not sell personal information.
        </p>
      </Container>
    </section>
  );
}
