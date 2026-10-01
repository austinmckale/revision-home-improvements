import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import EmergencyBar from "@/components/layout/EmergencyBar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import TrackingEvents from "@/components/TrackingEvents";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getLocalBusinessJsonLd } from "@/lib/structuredData";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const defaultDescription =
  "Remodeling and damage repairs in Allentown, Bethlehem, Reading, the Lehigh Valley and Berks County. Explore photos and plan a written scope with RHI Pros.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "RHI Pros | Lehigh Valley Remodeling & Restoration",
    template: "%s | RHI Pros",
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: "RHI Pros | Lehigh Valley Remodeling & Restoration",
    description: defaultDescription,
    images: [
      {
        url: siteConfig.ogImage,
        alt: "Gable-roof pavilion over a patio with planted garden edges beside a house.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RHI Pros | Lehigh Valley Remodeling & Restoration",
    description: defaultDescription,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: ["/favicon-48x48.png"],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-ND2W58Q5";
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const googleAdsPhoneConversionId = "AW-16834624221/1EeFCMD4wYocEN31r9s-";
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const gtagId = gaId || googleAdsId;

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}>
      <body className="antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[10000] -translate-y-24 bg-[var(--accent)] px-5 py-3 font-semibold text-white focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--brand)]"
        >
          Skip to content
        </a>
        <JsonLd data={getLocalBusinessJsonLd()} />
        {gtmId && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        {gtagId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());${
                gaId
                  ? `
              gtag('config', '${gaId}');`
                  : ""
              }${
                googleAdsId
                  ? `
              gtag('config', '${googleAdsId}');
              gtag('config', '${googleAdsPhoneConversionId}', {
                'phone_conversion_number': '${siteConfig.phoneDisplay}'
              });`
                  : ""
              }`}
            </Script>
          </>
        )}
        {fbPixelId && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${fbPixelId}');
fbq('track', 'PageView');`}
          </Script>
        )}
        <TrackingEvents />
        <Header />
        <EmergencyBar />
        <main id="main-content" tabIndex={-1} className="pb-20 outline-none md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
