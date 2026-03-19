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
    <html lang="en">
      <body className="antialiased">
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
                gaId ? `
              gtag('config', '${gaId}');` : ""
              }${
                googleAdsId ? `
              gtag('config', '${googleAdsId}');
              gtag('config', '${googleAdsPhoneConversionId}', {
                'phone_conversion_number': '${siteConfig.phoneDisplay}'
              });` : ""
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
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
