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
  const isLogin = pathname.startsWith("/login");

  const session = "Usuario";
  const name = "Usuario";

  return (
    <html lang="es">
      <body className="h-screen overflow-hidden">
        {!isLogin ? (
          <div className="flex flex-col h-screen">
            {/* Header fijo */}
            <div className="fixed top-0 left-0 right-0 z-10">
              <HeaderNavBar session={session} name={name} />
            </div>

            <div className="flex flex-1 pt-16">
              {/* Sidebar fijo debajo del header */}
              <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-20">
                <Sidebar />
              </div>

              {/* Contenido principal con margen para sidebar y header */}
              <main className="flex-1 ml-56 p-4 overflow-auto h-[calc(100vh-4rem)]">
                {children}
              </main>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
