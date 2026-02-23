import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import EmergencyBar from "@/components/layout/EmergencyBar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import TrackingEvents from "@/components/TrackingEvents";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Revision Home Improvements | Reading & Lehigh Valley Remodeling",
    template: "%s | Revision Home Improvements",
  },
  description:
    "Home remodeling and restoration contractor serving Reading, Wyomissing, Berks County, Allentown, Bethlehem, and Lehigh Valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className="antialiased">
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
