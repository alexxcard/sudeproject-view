"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { NewProyecto } from "@/types";
import { Proyecto } from "@/interface";
import ProyectoForm from "@/components/features/ProyectForm";

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Cargar proyectos desde backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/") // cambia al dominio de tu backend
      .then((res) => res.json())
      .then((data) => {
        // Si la API tiene paginación (DRF por defecto), los proyectos vienen en `results`
        if (Array.isArray(data)) {
          setProyectos(data);
        } else if (data.results && Array.isArray(data.results)) {
          setProyectos(data.results);
        } else {
          console.error("Formato inesperado de respuesta:", data);
        }
      })
      .catch((err) => console.error("Error cargando proyectos:", err));
  }, []);

  // 🔹 Guardar nuevo proyecto
  const addProyecto = async (data: NewProyecto) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/projects/", { // GET o POST
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // si usas sesiones con cookies
      });
      if (!res.ok) throw new Error("Error al crear proyecto");
      const nuevo = await res.json();

      // Si hay paginación, igual agregamos al array actual
      setProyectos((prev) => [nuevo, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Filtrado seguro (solo si es array)
  const filteredProyectos = Array.isArray(proyectos)
    ? proyectos.filter((p) => !statusFilter || p.status === statusFilter)
    : [];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow-md mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Proyectos</h1>
          <div className="flex gap-2">
            <Button
              label="Nuevo Proyecto"
              icon="pi pi-plus"
              onClick={() => setShowForm(true)}
            />
            <Link href="/home">
              <Button label="Volver al inicio" icon="pi pi-home" />
            </Link>
          </div>
        </div>

        {/* 🔹 Filtro por estado */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Dropdown
            value={statusFilter}
            options={["Activo", "Inactivo", "En Progreso"]}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filtrar por estado"
            showClear
          />
          <Button
            label="Limpiar filtros"
            onClick={() => setStatusFilter(null)}
          />
        </div>

        {/* 🔹 Tabla de proyectos */}
        <DataTable
          value={filteredProyectos}
          paginator
          rows={5}
          stripedRows
          responsiveLayout="scroll"
          size="small"
        >
          <Column field="name" header="Nombre" />
          <Column field="description" header="Descripción" />
          <Column field="owner" header="Propietario" />
          <Column field="created_at" header="Creado" />
        </DataTable>
      </Card>

      {/* 🔹 Modal de formulario */}
      <ProyectoForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={addProyecto}
      />
    </div>
  );
}
