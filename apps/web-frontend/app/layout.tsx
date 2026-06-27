import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Komorebi — Real-time AI analytics, generative UI",
  description:
    "Ask your data anything. Komorebi streams real-time KPIs over SSE and renders answers as live charts via generative UI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
