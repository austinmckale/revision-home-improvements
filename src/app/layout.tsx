import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import EmergencyBar from "@/components/layout/EmergencyBar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import TrackingEvents from "@/components/TrackingEvents";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site";
import { getLocalBusinessJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Revision Home Improvements | Lehigh Valley Remodeling & Restoration",
    template: "%s | Revision Home Improvements",
  },
  description:
    "Licensed remodeling and restoration contractor serving the Lehigh Valley, Reading, and Berks County. Kitchens, bathrooms, basements, and damage repair.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: "Revision Home Improvements | Lehigh Valley Remodeling & Restoration",
    description:
      "Kitchen, bathroom, basement, and restoration projects with clear scopes, fast communication, and quality workmanship across the Lehigh Valley, Reading, and Berks County.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revision Home Improvements | Lehigh Valley Remodeling & Restoration",
    description:
      "Kitchen, bathroom, basement, and restoration projects with clear scopes, fast communication, and quality workmanship.",
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={getLocalBusinessJsonLd()} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
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
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
