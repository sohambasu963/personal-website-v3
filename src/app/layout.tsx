import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soham Basu",
  description:
    "Soham Basu | Software Developer and Computer Science + Finance at the University of Waterloo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
