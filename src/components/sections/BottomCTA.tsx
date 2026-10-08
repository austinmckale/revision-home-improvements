import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

type BottomCTAProps = {
  title?: string;
  description?: string;
  showFinancing?: boolean;
  className?: string;
  quoteHref?: string;
};

export default function BottomCTA({
  title = "Let’s talk about your project.",
  description = "Tell us what you have in mind. We will talk it through and set up a visit to see the space.",
  showFinancing = true,
  className = "",
  quoteHref = "/request-a-quote",
}: BottomCTAProps) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>
        <div className="relative overflow-hidden bg-[var(--accent)] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div
            className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-8 -top-24 h-64 w-64 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="eyebrow eyebrow-light justify-center">Start a conversation</p>
            <h2 className="heading-serif mt-5 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/70">{description}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href={quoteHref}>Request a quote</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            {showFinancing && (
              <p className="mt-5 text-xs text-white/60">
                {siteConfig.financing.teaser} {siteConfig.financing.shortDisclosure}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
