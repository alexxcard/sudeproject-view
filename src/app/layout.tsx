"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HeaderNavBar from "@/components/ui/HeaderNavBar";
import Sidebar from "@/components/ui/Siderbar";
import "./globals.css";
import Provider from "@/components/Provider";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (pathname === "/") router.push("/login");
  }, [pathname, router]);

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

            {/* Contenedor Sidebar + Main */}
            <div className="flex flex-1 pt-16 h-[calc(100vh-4rem)]">
              {/* Sidebar ahora no es fixed */}
              <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

              {/* Main se ajusta automáticamente al sidebar */}
              <main className="flex-1 p-4 overflow-auto transition-all duration-300">
                <Provider>{children}</Provider>
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
