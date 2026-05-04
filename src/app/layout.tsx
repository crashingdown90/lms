import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-hanken", 
});

export const metadata: Metadata = {
  title: "SOLASIDO | Pemkot Sukabumi",
  description: "Sistem Online Pembelajaran Berbasis Video (SOLASIDO). Inovasi pembelajaran mandiri berbasis microlearning untuk ASN Pemerintah Kota Sukabumi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${hanken.variable} font-sans antialiased bg-background text-foreground min-h-screen relative`}>
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
