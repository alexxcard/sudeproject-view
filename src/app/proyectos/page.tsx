"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { NewProyecto } from "@/types";
import { Proyecto } from "@/interface";
import ProyectoForm from "@/components/features/ProyectForm";

// Mock de ejemplo
const proyectosMock: Proyecto[] = [
  {
    id: "p1",
    name: "Sistema Web",
    description: "Proyecto principal de la empresa",
    status: "Activo",
    start_date: "2025-09-01",
    end_date: "2025-12-31",
    created_at: "2025-09-01",
    updated_at: "2025-09-01",
  },
  {
    id: "p2",
    name: "Gestor de Reportes",
    description: "Generación y descarga de reportes",
    status: "En Progreso",
    start_date: "2025-09-05",
    end_date: "",
    created_at: "2025-09-05",
    updated_at: "2025-09-05",
  },
];

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState(proyectosMock);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

 const addProyecto = (data: NewProyecto) => {
  const nextId = (proyectos.length + 1).toString();
  const newItem: Proyecto = {
    id: nextId,
    name: data.name,
    description: data.description,
    status: data.status,
    start_date: data.start_date,
    end_date: data.end_date,
    created_at: new Date().toISOString().split("T")[0],
    updated_at: new Date().toISOString().split("T")[0],
  };
  setProyectos([newItem, ...proyectos]);
};
  const filteredProyectos = proyectos.filter(
    (p) => !statusFilter || p.status === statusFilter
  );

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

        {/* Filtro por estado */}
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

        {/* Tabla de proyectos */}
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
          <Column field="status" header="Estado" />
          <Column field="start_date" header="Fecha inicio" />
          <Column field="end_date" header="Fecha fin" />
          <Column field="created_at" header="Creado" />
          <Column field="updated_at" header="Actualizado" />
        </DataTable>
      </Card>

      {/* Modal del formulario */}
      <ProyectoForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={addProyecto}
      />
    </div>
  );
}
