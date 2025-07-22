import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Association of Indian Manufacturers (AIM) - Empowering MSMEs in India",
    template: "%s | Association of Indian Manufacturers (AIM)",
  },
  description:
    "Association of Indian Manufacturers (AIM) is dedicated to empowering Micro, Small and Medium Enterprises (MSMEs) across India through advocacy, networking, and support services.",
  keywords: [
    "AIM",
    "Association of Indian Manufacturers",
    "MSME",
    "Manufacturing",
    "India",
    "Business Association",
  ],
  authors: [{ name: "Association of Indian Manufacturers" }],
  creator: "Association of Indian Manufacturers",
  publisher: "Association of Indian Manufacturers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aim.ind.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aim.ind.in",
    title: "Association of Indian Manufacturers (AIM)",
    description:
      "Empowering Micro, Small and Medium Enterprises (MSMEs) across India",
    siteName: "Association of Indian Manufacturers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Association of Indian Manufacturers (AIM)",
    description: "Empowering MSMEs across India",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
