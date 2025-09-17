"use client";
import { ProfileProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

export default function Profile({ session, name }: ProfileProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "GET" });

      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.status}`);
      }

      alert("Sesión cerrada correctamente."); // reemplaza el message.success
      router.push("/notAuth");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al cerrar sesión."); // reemplaza el message.error
    }
  };

  // Cerrar dropdown si se hace click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* AVATAR */}
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold">
          {name?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="text-sm text-gray-600 text-center">
          {session && `Hola, ${name}`}
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            🚪 Salir
          </button>
        </div>
      )}
    </div>
  );
}
