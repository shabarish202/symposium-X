import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYMPOSIUM-X | Registration & Food Pass",
  description: "SYMPOSIUM-X event registration and QR food pass demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
