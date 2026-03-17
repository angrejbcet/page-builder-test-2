import React from "react";
import type { Metadata } from "next";
import { ModalProvider } from "@/providers/ModalProvider";
import { getGoogleFontUrl } from "@/public/lib/google-fonts";
import { MockupHeader, type MockupHeaderProps } from "@/public/mockup/MockupHeader";
import { MockupFooter, type MockupFooterProps } from "@/public/mockup/MockupFooter";
import { MobileBottomNav } from "@/public/mockup/MobileBottomNav";
import { siteConfig } from "@/content/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Point.Click.Engage",
  description: "PCE NextJS Website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fonts = siteConfig.fonts ?? { headingFamily: "Montserrat", bodyFamily: "Open Sans" };
  const fontStyle = {
    "--font-heading": `"${fonts.headingFamily}", sans-serif`,
    "--font-body": `"${fonts.bodyFamily}", sans-serif`,
  } as React.CSSProperties;
  const headerProps = siteConfig.headerProps as {
    navLinks?: { label: string; href: string }[];
    phone?: string;
    ctaText?: string;
  } | null;

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={getGoogleFontUrl(fonts)} />
      </head>
      <body className="font-sans antialiased" style={fontStyle}>
        <ModalProvider>
          <div className="@container" data-theme={siteConfig.theme}>
            {headerProps && <MockupHeader {...(siteConfig.headerProps as MockupHeaderProps)} />}
            {children}
            {siteConfig.footerProps && (
              <MockupFooter {...(siteConfig.footerProps as MockupFooterProps)} />
            )}
            {headerProps && (
              <MobileBottomNav
                navLinks={headerProps.navLinks}
                phone={headerProps.phone}
                ctaText={headerProps.ctaText}
              />
            )}
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
