"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import IncidenForm from "@/components/features/IncidentForm";
import { NewIncidencia, RowDataPriority, RowDataStatus } from "@/types";
import { Incidencia } from "@/interface";

export default function IncidenciasPage() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Obtener incidencias desde backend
  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const res = await fetch("http://localhost:8000/incidents/");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();

        setIncidencias(
          data.map((i: any) => ({
            id: i.id,
            title: i.title,
            description: i.description,
            status: i.status,
            priority: i.priority,
            project: i.project.name,
            reporter: i.reporter.username,
            assignee: i.assignee?.username || "",
            created_at: i.created_at.split("T")[0],
            updated_at: i.updated_at.split("T")[0],
          }))
        );
      } catch (err) {
        console.error("Error fetching incidencias:", err);
      }
    };

    fetchIncidencias();
  }, []);

  // 🔹 Eliminar incidencia desde backend
  const deleteIncidencia = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/incidents/${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error(res.statusText);
      setIncidencias((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error eliminando incidencia:", err);
    }
  };

  // 🔹 Crear nueva incidencia en backend
const addIncidencia = async (data: NewIncidencia) => {
  try {
    const res = await fetch("http://localhost:8000/incidents/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        // mapear los campos correctos según tu backend Django
        project: data.project,   // aquí va el ID o nombre que espera Django
        reporter: data.reporter, // aquí va el ID del usuario reportero
      }),
    });

    if (!res.ok) throw new Error(res.statusText);
    const newIncident = await res.json();

    setIncidencias((prev) => [
      {
        id: newIncident.id,
        title: newIncident.title,
        description: newIncident.description,
        status: newIncident.status,
        priority: newIncident.priority,
        project: newIncident.project.name,
        reporter: newIncident.reporter.username,
        assignee: newIncident.assignee?.username || "",
        created_at: newIncident.created_at.split("T")[0],
        updated_at: newIncident.updated_at.split("T")[0],
      },
      ...prev,
    ]);
  } catch (err) {
    console.error("Error creando incidencia:", err);
  }
};

  // 🔹 Filtrado de incidencias
  const filteredIncidencias = incidencias.filter(
    (i) =>
      (!statusFilter || i.status === statusFilter) &&
      (!priorityFilter || i.priority === priorityFilter)
  );

  // 🔹 Templates para estado y prioridad
  const statusTemplate = (rowData: RowDataStatus) => {
    const severity =
      rowData.status === "Open"
        ? "warning"
        : rowData.status === "In Progress"
        ? "info"
        : "success";
    return <Tag value={rowData.status} severity={severity} />;
  };

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
