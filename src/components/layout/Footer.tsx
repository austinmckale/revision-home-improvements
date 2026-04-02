import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-[var(--accent)] text-white/70">
      <div className="border-t border-white/5" />
      <Container className="py-16 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-block group">
              <span className="heading-serif text-2xl font-bold text-white tracking-widest uppercase transition-opacity group-hover:opacity-80">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/60">
              Premium remodeling and restoration across the Lehigh Valley and Berks County. We build with integrity.
            </p>
            <div className="mt-8 flex flex-col gap-2 text-sm font-medium">
              <a href={siteConfig.phoneHref} className="hover:text-white transition-colors">{siteConfig.phoneDisplay}</a>
              <a href={`mailto:${siteConfig.primaryEmail}`} className="hover:text-white transition-colors">{siteConfig.primaryEmail}</a>
              <p className="opacity-40 font-normal mt-2">{siteConfig.address.street}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-24">
            <div>
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Expertise</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
                <li><Link href="/projects" className="hover:text-white transition-colors">Featured Projects</Link></li>
                <li><Link href="/fire-water-damage-restoration" className="text-[var(--brand)] hover:opacity-80 transition-opacity">Emergency Restoration</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Company</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/our-process" className="hover:text-white transition-colors">Our Process</Link></li>
                <li><Link href="/warranty" className="hover:text-white transition-colors">Warranty & Guarantees</Link></li>
                <li><Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 py-8 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. PA HIC #{siteConfig.hicNumber}.</p>
          <div className="flex flex-wrap justify-center gap-6 font-medium">
            <a href={siteConfig.facebookPageUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <a href={siteConfig.googleBusinessProfileUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Google Reviews</a>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
