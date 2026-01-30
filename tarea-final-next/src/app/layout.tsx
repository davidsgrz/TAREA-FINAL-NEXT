import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import "./globals.css";
import ClientFooter from "@/components/ClientFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <ClientFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}