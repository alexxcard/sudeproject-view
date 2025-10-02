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
import { getSession } from "next-auth/react";
import { getIncidents } from "@/app/services/api";

const API_URL = "http://localhost:8000/api/incidents/";

export default function IncidenciasPage() {
  const [incidencias, setIncidencias] = useState<NewIncidencia[]>([]);
  const [statusFilter, setStatusFilter] = useState<"Open" | "Assigned" | "Resolved" | "Closed" | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<"High" | "Medium" | "Low" | null>(null);
  const [showForm, setShowForm] = useState(false);

  // -------------------- Obtener incidencias --------------------
useEffect(() => {
const fetchIncidencias = async () => {
  const session = await getSession();
  if (!session) {
    console.error("No hay sesión activa");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/incidents/", {
      headers: {
        "Authorization": `Bearer ${session.user.access}`,
        "Content-Type": "application/json",
      },
    });

   
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
    console.error(err);
  }
};

  fetchIncidencias();
}, []);

  // -------------------- Eliminar incidencia --------------------
const deleteIncidencia = async (id: string) => {
  try {
    const session = await getSession();
    if (!session) {
      console.error("No hay sesión activa");
      return;
    }

    const res = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${session.user.access}`, // 👈 usar el mismo token
      },
    });

    if (!res.ok) throw new Error(res.statusText);
    setIncidencias((prev) => prev.filter((i) => i.id !== id));
  } catch (err) {
    console.error("Error eliminando incidencia:", err);
  }
};

  // -------------------- Crear nueva incidencia --------------------
 const addIncidencia = async (data: NewIncidencia) => {
  try {
    const session = await getSession();
    if (!session) {
      console.error("No hay sesión activa");
      return;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.user.access}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        project: data.project,   // 👈 usar project
        reporter: data.reporter, // 👈 usar reporter
        assignee: data.assignee || null,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const newIncident = await res.json();

    setIncidencias((prev) => [
      {
        id: newIncident.id,
        title: newIncident.title,
        description: newIncident.description,
        status: newIncident.status as RowDataStatus["status"],
        priority: newIncident.priority as RowDataPriority["priority"],
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

  // -------------------- Filtrado --------------------
  const filteredIncidencias = incidencias.filter(
    (i) =>
      (!statusFilter || i.status === statusFilter) &&
      (!priorityFilter || i.priority === priorityFilter)
  );

  // -------------------- Templates --------------------
  const statusTemplate = (rowData: RowDataStatus) => {
    const severity =
      rowData.status === "Open"
        ? "warning"
        : rowData.status === "Assigned"
        ? "info"
        : rowData.status === "Resolved"
        ? "success"
        : "danger"; // Closed
    return <Tag value={rowData.status} severity={severity} />;
  };

  const priorityTemplate = (rowData: RowDataPriority) => {
    const severity =
      rowData.priority === "High"
        ? "danger"
        : rowData.priority === "Medium"
        ? "warning"
        : "info"; // Low
    return <Tag value={rowData.priority} severity={severity} />;
  };

  return (
    <div className="bg-[#f0f4f8] min-h-screen p-6">
      <Card className="shadow-md mb-4">
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

        <div className="flex flex-wrap gap-3 mb-4">
          <Dropdown
            value={statusFilter}
            options={["Open", "Assigned", "Resolved", "Closed"]}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filtrar por estado"
            showClear
          />
          <Dropdown
            value={priorityFilter}
            options={["High", "Medium", "Low"]}
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
            body={(rowData: NewIncidencia) => (
              <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-sm"
                onClick={() => deleteIncidencia(rowData.id)}
              />
            )}
          />
        </DataTable>
      </Card>

      <IncidenForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={addIncidencia}
      />
    </div>
  );
}
