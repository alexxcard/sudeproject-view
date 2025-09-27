// src/app/notAuth/layout.tsx
"use client";

export default function NotAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center">
      {children}
    </div>
  );
}
