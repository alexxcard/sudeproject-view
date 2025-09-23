"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { NewIncidencia, RowDataPriority, RowDataStatus } from "@/types";
import IncidenForm from "@/components/features/IncidentForm";
import { Incidencia } from "@/interface";

// Datos de ejemplo
const incidenciasMock: Incidencia[] = [
  {
    id: "1a2b3c",
    title: "Error en login",
    description: "Los usuarios no pueden iniciar sesión",
    status: "Open",
    priority: "High",
    project: "Sistema Web",
    reporter: "Juan Pérez",
    assignee: "María Gómez",
    created_at: "2025-09-18",
    updated_at: "2025-09-18",
  },
  {
    id: "4d5e6f",
    title: "Problema con reportes",
    description: "El PDF no se descarga",
    status: "In Progress",
    priority: "Medium",
    project: "Gestor de Reportes",
    reporter: "Luis Fernández",
    assignee: "Pedro Torres",
    created_at: "2025-09-17",
    updated_at: "2025-09-18",
  },
];

export default function IncidenciasPage() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>(incidenciasMock);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  /** 🔹 Eliminar incidencia */
  const deleteIncidencia = (id: string) => {
    setIncidencias(incidencias.filter((inc) => inc.id !== id));
  };

/** 🔹 Agregar incidencia */
const addIncidencia = (data: NewIncidencia) => {
  const nextId = (incidencias.length + 1).toString();
  const newItem: Incidencia = {
    id: nextId,
    ...data,
    created_at: new Date().toISOString().split("T")[0],
    updated_at: new Date().toISOString().split("T")[0],
  };
  setIncidencias([newItem, ...incidencias]);
};

  /** 🔹 Filtrar incidencias */
  const filteredIncidencias = incidencias.filter(
    (i) =>
      (!statusFilter || i.status === statusFilter) &&
      (!priorityFilter || i.priority === priorityFilter)
  );

  /** 🔹 Render estado */
  const statusTemplate = (rowData: RowDataStatus) => {
    const severity =
      rowData.status === "Open"
        ? "warning"
        : rowData.status === "In Progress"
        ? "info"
        : "success";
    return <Tag value={rowData.status} severity={severity} />;
  };

  /** 🔹 Render prioridad */
  const priorityTemplate = (rowData: RowDataPriority) => {
    const severity =
      rowData.priority === "Critical"
        ? "danger"
        : rowData.priority === "High"
        ? "warning"
        : rowData.priority === "Medium"
        ? "info"
        : "success";
    return <Tag value={rowData.priority} severity={severity} />;
  };

  return (
    <div className="bg-[#f0f4f8] min-h-screen p-6">
      <Card className="shadow-md mb-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Incidencias</h1>
          <div className="flex gap-2">
            <Button
              label="Nueva Incidencia"
              icon="pi pi-plus"
              onClick={() => setShowForm(true)}
            />
            <Link href="/home">
              <Button label="Volver al inicio" icon="pi pi-home" />
            </Link>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Dropdown
            value={statusFilter}
            options={["Open", "In Progress", "Closed"]}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filtrar por estado"
            showClear
          />
          <Dropdown
            value={priorityFilter}
            options={["Critical", "High", "Medium", "Low"]}
            onChange={(e) => setPriorityFilter(e.value)}
            placeholder="Filtrar por prioridad"
            showClear
          />
          <Button
            label="Limpiar filtros"
            onClick={() => {
              setStatusFilter(null);
              setPriorityFilter(null);
            }}
          />
        </div>

        {/* Tabla */}
        <DataTable
          value={filteredIncidencias}
          paginator
          rows={5}
          stripedRows
          responsiveLayout="scroll"
          size="small"
        >
          <Column field="title" header="Título" />
          <Column field="description" header="Descripción" />
          <Column field="status" header="Estado" body={statusTemplate} />
          <Column field="priority" header="Prioridad" body={priorityTemplate} />
          <Column field="project" header="Proyecto" />
          <Column field="reporter" header="Reportado por" />
          <Column field="assignee" header="Asignado a" />
          <Column field="created_at" header="Creado" />
          <Column field="updated_at" header="Actualizado" />
          <Column
            header="Accion"
            body={(rowData: Incidencia) => (
              <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-sm"
                onClick={() => deleteIncidencia(rowData.id)}
              />
            )}
          />
        </DataTable>
      </Card>

      {/* Modal del formulario */}
      <IncidenForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={addIncidencia}
      />
    </div>
  );
}
