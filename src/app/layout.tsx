import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { GeckoChatButton } from "@/components/GeckoChatButton";
import { AgentSidebar } from "@/components/AgentSidebar";
import { PageTransition } from "@/components/PageTransition";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Gecko | AI PropTech Platform",
  description: "New-Gen Stealth Luxury AI real estate intelligence for the Indian market.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          "font-sans antialiased bg-background text-foreground overflow-hidden"
        )}
      >
        <div className="flex flex-col h-screen w-full">
            <Header />
            <main className="flex-1 overflow-y-auto mt-[76px]">
              <PageTransition>{children}</PageTransition>
            </main>
            <GeckoChatButton />
            <AgentSidebar />
          </div>
      </body>
    </html>
  );
}
