import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Revision Home Improvements collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }])} />
      <section className="py-14">
        <Container className="max-w-3xl">
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">Last updated: February 2026</p>

          <div className="mt-8 space-y-8 text-sm text-[var(--muted)]">
            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">Information We Collect</h2>
              <p className="mt-2">When you use our website, we may collect:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li><strong>Contact information</strong> you provide through our quote request form: name, phone number, email address, city, ZIP code, and project details.</li>
                <li><strong>Usage data</strong> collected automatically: pages visited, time on site, device type, browser, and referring URL.</li>
                <li><strong>Cookies and tracking data</strong> from analytics and spam protection services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">How We Use Your Information</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>To respond to your quote requests and follow up on project inquiries.</li>
                <li>To improve our website, content, and services based on how visitors use the site.</li>
                <li>To protect against spam and abuse on our forms.</li>
                <li>To measure advertising effectiveness if you arrived from an ad.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">Third-Party Services</h2>
              <p className="mt-2">We use the following third-party services that may collect data:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li><strong>Google Analytics</strong> — website traffic analysis and usage patterns.</li>
                <li><strong>Meta (Facebook) Pixel</strong> — ad measurement and audience targeting.</li>
                <li><strong>Cloudflare Turnstile</strong> — spam protection on our quote form.</li>
              </ul>
              <p className="mt-2">Each service operates under its own privacy policy. We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">Cookies</h2>
              <p className="mt-2">Our site uses cookies for analytics and advertising purposes. You can control cookies through your browser settings. Disabling cookies may affect some site functionality.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">Data Retention</h2>
              <p className="mt-2">Quote form submissions are retained for the purpose of following up on your project inquiry. Analytics data is retained according to the policies of each analytics provider.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">Your Rights</h2>
              <p className="mt-2">You may request access to, correction of, or deletion of your personal information by contacting us at <a href={`mailto:${siteConfig.primaryEmail}`} className="font-semibold text-[var(--brand)]">{siteConfig.primaryEmail}</a> or by calling <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">{siteConfig.phoneDisplay}</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">Changes to This Policy</h2>
              <p className="mt-2">We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--accent)]">Contact</h2>
              <p className="mt-2">
                {siteConfig.name}<br />
                {siteConfig.address.street}<br />
                <a href={`mailto:${siteConfig.primaryEmail}`} className="font-semibold text-[var(--brand)]">{siteConfig.primaryEmail}</a><br />
                <a href={siteConfig.phoneHref} className="font-semibold text-[var(--brand)]">{siteConfig.phoneDisplay}</a>
              </p>
            </section>
          </div>

          <p className="mt-8 text-sm">
            <Link href="/" className="font-semibold text-[var(--brand)]">Back to home</Link>
          </p>
        </Container>
      </section>
    </>
  );
}
