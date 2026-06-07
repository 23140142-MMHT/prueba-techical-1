import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

import { teamConfig } from "@content/config";
import { hexToRgbChannels } from "@/lib/utils";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ChatButton } from "@/components/ai/ChatButton";

// Tipografía: Space Grotesk para títulos, Inter para cuerpo.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `Team ${teamConfig.number} ${teamConfig.name} — Technical Binder`,
    template: `%s · Team ${teamConfig.number} ${teamConfig.name}`,
  },
  description: `Technical Binder de ${teamConfig.robotName}, el robot del equipo FRC ${teamConfig.number} ${teamConfig.name} para la temporada ${teamConfig.season} (${teamConfig.gameName}).`,
  openGraph: {
    title: `Team ${teamConfig.number} ${teamConfig.name} — Technical Binder`,
    description: `Diseño, subsistemas e iteraciones de ${teamConfig.robotName}.`,
    images: ["/team/banner.jpg"],
    type: "website",
  },
  metadataBase: new URL(teamConfig.socialLinks.website),
};

export const viewport: Viewport = {
  themeColor: teamConfig.primaryColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inyectamos los colores de marca como variables CSS desde config.ts.
  // Así el equipo cambia su identidad visual editando un solo archivo.
  const brandStyle = {
    "--primary": hexToRgbChannels(teamConfig.primaryColor),
    "--accent": hexToRgbChannels(teamConfig.accentColor),
  } as React.CSSProperties;

  return (
    <html
      lang="es"
      // `dark` siempre presente: el binder es dark-mode-first.
      className={`dark ${spaceGrotesk.variable} ${inter.variable}`}
      style={brandStyle}
    >
      <body className="flex min-h-dvh flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* FAB del chatbot AI, flotante sobre toda la app */}
        <ChatButton />
      </body>
    </html>
  );
}
