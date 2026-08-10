import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat, Cinzel, Outfit } from "next/font/google";
import SpaceBackground from "@/components/SpaceBackground";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "mohamed tareq - AI Engineer",
  description:
    "mohamed tareq is an AI Engineer specializing in developing and implementing advanced artificial intelligence solutions. With expertise in machine learning, deep learning, and natural language processing, he creates innovative applications that leverage AI to solve complex problems. His work focuses on building intelligent systems that enhance user experiences and drive technological advancements across various industries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${cinzel.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col relative text-slate-100 bg-[#020208]"
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#090d16",
              color: "#f8fafc",
              border: "1px solid rgba(34, 211, 238, 0.3)",
              boxShadow: "0 0 25px rgba(34, 211, 238, 0.2)",
              padding: "14px 18px",
              borderRadius: "16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#22d3ee",
                secondary: "#090d16",
              },
            },
            error: {
              style: {
                background: "#090d16",
                color: "#f8fafc",
                border: "1px solid rgba(244, 63, 94, 0.4)",
                boxShadow: "0 0 25px rgba(244, 63, 94, 0.2)",
                padding: "14px 18px",
                borderRadius: "16px",
                fontSize: "14px",
              },
              iconTheme: {
                primary: "#f43f5e",
                secondary: "#090d16",
              },
            },
          }}
        />
        <CustomCursor />
        <SpaceBackground />
        {children}
      </body>
    </html>
  );
}
