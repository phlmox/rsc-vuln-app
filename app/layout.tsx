import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSC Güvenlik Demo",
  description: "React Server Components güvenlik zafiyetleri demo uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <div className="container">
          <nav>
            <a href="/">Ana Sayfa</a>
            <a href="/scenario-1">Senaryo 1: Payload Sızıntısı</a>
            <a href="/scenario-2">Senaryo 2: BOLA</a>
            <a href="/scenario-3">Senaryo 3: Server Action</a>
            <a href="/scenario-4">Senaryo 4: API Key Sızıntısı</a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
