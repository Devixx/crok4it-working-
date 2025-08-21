import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // The path is simpler now

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crok4IT - Expert IT Consulting",
  description:
    "Your trusted partner for IT audit, design, development, and training.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
