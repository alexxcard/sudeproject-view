// src/app/layout.tsx
import HeaderNavBar from "@/components/ui/HeaderNavBar";
import "./globals.css";
import Sidebar from "@/components/ui/Siderbar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  // Temporal: valores de prueba
  const session = "Usuario";
  const name = "Usuario";

  return (
    <html lang="es">
      <body>
        <div className="flex flex-col">
          {/* Header */}
          <HeaderNavBar session={session} name={name} />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-[#f0f4f8]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
