export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="h-screen overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
