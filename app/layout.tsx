import type { Metadata } from "next";
import { Providers } from "@/redux/provider";
import "./globals.css";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
