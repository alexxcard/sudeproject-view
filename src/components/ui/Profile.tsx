"use client";
import { ProfileProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { signOut } from "next-auth/react"; // 👈 importa NextAuth

export default function Profile({ session, name }: ProfileProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toast = useRef<Toast>(null);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false }); // 👈 cierra sesión usando NextAuth

      toast.current?.show({
        severity: "success",
        summary: "Sesión Cerrada",
        detail: "Has cerrado sesión correctamente.",
        life: 3000,
      });

      setTimeout(() => {
        router.push("/notAuth"); // redirige a tu página pública
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.current?.show({
        severity: "error",
        summary: "Error al cerrar sesión",
        detail: "Hubo un problema al cerrar sesión. Inténtalo de nuevo.",
        life: 2000,
      });
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <Toast ref={toast} />

      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors duration-200"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#B1030D] text-white font-bold">
          {session ? (
            name ? (
              <span className="text-lg">{name[0].toUpperCase()}</span>
            ) : (
              <i className="pi pi-user text-lg"></i>
            )
          ) : (
            <i className="pi pi-user text-lg"></i>
          )}
        </div>

        {session && (
          <span className="text-xs text-gray-700 font-bold">
            Hola, {name || "Usuario"}
          </span>
        )}

        <i
          className={`pi ${open ? "pi-angle-up" : "pi-angle-down"} text-gray-600`}
        ></i>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50"
          >
            <i className="pi pi-sign-out text-base"></i> Salir
          </button>
        </div>
      )}
    </div>
  );
}
