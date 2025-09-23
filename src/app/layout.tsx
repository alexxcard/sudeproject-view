// src/app/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import HeaderNavBar from "@/components/ui/HeaderNavBar";
import Sidebar from "@/components/ui/Siderbar";
import "./globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/login"); // Detectamos ruta de login

  // Valores de prueba para HeaderNavBar
  const session = "Usuario";
  const name = "Usuario";

  return (
    <html lang="es">
      <body>
        {!isLogin ? (
          <div className="flex flex-col h-screen">
            {/* Header */}
            <HeaderNavBar session={session} name={name} />
            <div className="flex flex-1">
              {/* Sidebar */}
              <Sidebar />
              <main className="flex-1 overflow-auto bg-[#f0f4f8]">{children}</main>
            </div>
          </div>
        ) : (
          // Para login, renderizamos solo el contenido
          children
        )}
      </body>
    </html>
  );
}
