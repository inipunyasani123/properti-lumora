import "./globals.css";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500", "600", "700"], style: ["normal", "italic"], display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

const __jsonld = {"@context":"https://schema.org","@type":"RealEstateAgent","name":"Lumora","description":"Enam hunian mewah di Bali dan Jakarta, masing-masing dipegang satu konselor. Susun hari kunjungan privat untuk beberapa hunian sekaligus.","url":"https://properti-lumora.pintuweb.id","areaServed":"ID"};

export const metadata = {
  metadataBase: new URL("https://properti-lumora.pintuweb.id"),
  title: { default: "Lumora — Hunian mewah, dikunjungi secara privat", template: "%s — Lumora" },
  description: "Enam hunian mewah di Bali dan Jakarta, masing-masing dipegang satu konselor. Susun hari kunjungan privat untuk beberapa hunian sekaligus.",
  applicationName: "Lumora",
  keywords: ["villa mewah Bali", "rumah mewah Jakarta", "penthouse", "kunjungan privat", "properti mewah"],
  authors: [{ name: "Lumora" }],
  creator: "Lumora",
  publisher: "Lumora",
  alternates: { canonical: "https://properti-lumora.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://properti-lumora.pintuweb.id",
    siteName: "Lumora",
    title: "Lumora — Hunian mewah, dikunjungi secara privat",
    description: "Enam hunian mewah di Bali dan Jakarta, masing-masing dipegang satu konselor. Susun hari kunjungan privat untuk beberapa hunian sekaligus.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lumora — Hunian mewah, dikunjungi secara privat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumora — Hunian mewah, dikunjungi secara privat",
    description: "Enam hunian mewah di Bali dan Jakarta, masing-masing dipegang satu konselor. Susun hari kunjungan privat untuk beberapa hunian sekaligus.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">
        <div className="grain" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href="https://www.pintuweb.id/kontak?demo=lumora" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
        </body>
    </html>
  );
}
