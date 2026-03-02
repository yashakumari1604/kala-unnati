import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Y. Asha Kumari — Odissi Artist",
  description: "Classical Odissi Dancer, Choreographer, Teacher. Founder & Director of Kala Unnati Dance Foundation Trust, Bhubaneswar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}