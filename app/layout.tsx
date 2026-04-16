import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pawlo — Find & Register Pets in Your Neighborhood",
  description:
    "Pawlo helps you find lost pets and register your own with AI-powered photo matching. Connect your neighborhood, one paw at a time.",
  keywords: ["lost pets", "found pets", "pet registry", "neighborhood pets"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F59500",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
