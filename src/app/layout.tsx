import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { raleway } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kairos X app",
  description: "Plataforma de gestion de ingresos y gastos personales y familiares.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={raleway.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
