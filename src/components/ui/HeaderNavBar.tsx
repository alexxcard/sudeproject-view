"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Profile from "@/components/ui/Profile";
import { ProfileProps } from "@/types";

export default function HeaderNavBar({ session, name }: ProfileProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Función de búsqueda
  const handleSearch = () => {
    const query = search.toLowerCase().trim();

    if (query === "incidencias") {
      router.push("/incidencias");
    } else if (query === "tareas") {
      router.push("/tareas");
    } else if (query === "proyectos") {
      router.push("/proyectos");
    } else if (query === "usuarios") {
      router.push("/usuarios");
    } else {
      alert("No se encontró la sección: " + search);
    }

    setSearch(""); // limpia el input
  };

  return (
    <header className="flex items-center justify-between shadow-md px-6 py-3 bg-white">
      {/* Logo */}
      <Image src="/logosudeaseg.png" alt="logo Sudeaseg" width={240} height={120} />

      {/* Buscador */}
      <div className="flex items-center gap-2">
        <InputText
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar (ej: incidencias, tareas...)"
          className="p-inputtext-sm"
        />
        <Button
          label="Buscar"
          icon="pi pi-search"
          className="p-button-sm"
          onClick={handleSearch}
        />
      </div>

      {/* Profile con saludo */}
      <div className="flex items-center gap-3">
        {session && <span className="text-sm text-gray-600">Hola, {name}</span>}
        <Profile session={session} name={name} />
      </div>
    </header>
  );
}
