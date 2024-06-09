import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "AI Email Classifier",
  description:
    "An application that classifies emails using LLMs for efficient email management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-inter">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
