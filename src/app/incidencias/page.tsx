"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

// Tipos para RowData
type RowDataStatus = { status: string };
type RowDataPriority = { priority: string };

// Datos de ejemplo
const incidenciasMock = [
  { id: "1a2b3c", title: "Error en login", description: "Los usuarios no pueden iniciar sesión", status: "Open", priority: "High", project: "Sistema Web", reporter: "Juan Pérez", assignee: "María Gómez", created_at: "2025-09-18", updated_at: "2025-09-18" },
  { id: "4d5e6f", title: "Problema con reportes", description: "El PDF no se descarga", status: "In Progress", priority: "Medium", project: "Gestor de Reportes", reporter: "Luis Fernández", assignee: "Pedro Torres", created_at: "2025-09-17", updated_at: "2025-09-18" },
  { id: "7g8h9i", title: "Error en base de datos", description: "Caídas frecuentes en PostgreSQL", status: "Closed", priority: "Critical", project: "Base de Datos", reporter: "Carlos Díaz", assignee: "María Gómez", created_at: "2025-09-15", updated_at: "2025-09-16" },
  { id: "10j11k", title: "Bug en UI", description: "Botón no responde al click", status: "Open", priority: "Low", project: "Sistema Web", reporter: "Laura García", assignee: "Pedro Torres", created_at: "2025-09-12", updated_at: "2025-09-14" },
];

export default function IncidenciasPage() {
  const [incidencias, setIncidencias] = useState(incidenciasMock);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Nuevo formulario
  const [newIncidencia, setNewIncidencia] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    project: "",
    reporter: "",
    assignee: "",
  });

  // Función para eliminar incidencia
  const deleteIncidencia = (id: string) => {
    setIncidencias(incidencias.filter((inc) => inc.id !== id));
  };

  // Función para agregar nueva incidencia
  const addIncidencia = () => {
    const nextId = (incidencias.length + 1).toString();
    const newItem = {
      id: nextId,
      ...newIncidencia,
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    };
    setIncidencias([newItem, ...incidencias]);
    setNewIncidencia({ title: "", description: "", status: "Open", priority: "Low", project: "", reporter: "", assignee: "" });
  };

  // Filtrado dinámico
  const filteredIncidencias = incidencias.filter(
    (i) =>
      (!statusFilter || i.status === statusFilter) &&
      (!priorityFilter || i.priority === priorityFilter)
  );

  // Templates para etiquetas
  const statusTemplate = (rowData: RowDataStatus) => {
    const severity = rowData.status === "Open" ? "warning" : rowData.status === "In Progress" ? "info" : "success";
    return <Tag value={rowData.status} severity={severity} />;
  };

  const priorityTemplate = (rowData: RowDataPriority) => {
    const severity = rowData.priority === "Critical" ? "danger" : rowData.priority === "High" ? "warning" : rowData.priority === "Medium" ? "info" : "success";
    return <Tag value={rowData.priority} severity={severity} />;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      {/* Formulario de nueva incidencia */}
      <Card className="mb-4 p-4 shadow-md">
        <h2 className="text-lg font-bold mb-3">Agregar Nueva Incidencia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputText placeholder="Título" value={newIncidencia.title} onChange={(e) => setNewIncidencia({ ...newIncidencia, title: e.target.value })} />
          <InputText placeholder="Proyecto" value={newIncidencia.project} onChange={(e) => setNewIncidencia({ ...newIncidencia, project: e.target.value })} />
          <InputText placeholder="Reportado por" value={newIncidencia.reporter} onChange={(e) => setNewIncidencia({ ...newIncidencia, reporter: e.target.value })} />
          <InputText placeholder="Asignado a" value={newIncidencia.assignee} onChange={(e) => setNewIncidencia({ ...newIncidencia, assignee: e.target.value })} />
          <Dropdown value={newIncidencia.status} options={["Open", "In Progress", "Closed"]} onChange={(e) => setNewIncidencia({ ...newIncidencia, status: e.value })} placeholder="Estado" />
          <Dropdown value={newIncidencia.priority} options={["Critical", "High", "Medium", "Low"]} onChange={(e) => setNewIncidencia({ ...newIncidencia, priority: e.value })} placeholder="Prioridad" />
          <InputTextarea value={newIncidencia.description} onChange={(e) => setNewIncidencia({ ...newIncidencia, description: e.target.value })} placeholder="Descripción" rows={3} />
        </div>
        <Button className="mt-3" label="Agregar Incidencia" onClick={addIncidencia} />
      </Card>

      {/* Filtros y listado */}
      <Card className="shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Incidencias</h1>
          <Link href="/home">
            <Button label="Volver al inicio" icon="pi pi-home" />
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Dropdown value={statusFilter} options={["Open", "In Progress", "Closed"]} onChange={(e) => setStatusFilter(e.value)} placeholder="Filtrar por estado" showClear />
          <Dropdown value={priorityFilter} options={["Critical", "High", "Medium", "Low"]} onChange={(e) => setPriorityFilter(e.value)} placeholder="Filtrar por prioridad" showClear />
          <Button label="Limpiar filtros" onClick={() => { setStatusFilter(null); setPriorityFilter(null); }} />
        </div>

        {/* Tabla de incidencias */}
        <DataTable value={filteredIncidencias} paginator rows={5} stripedRows responsiveLayout="scroll" size="small">
          
          <Column field="title" header="Título" />
          <Column field="description" header="Descripción" />
          <Column style={{ width: "120px" }} field="status" header="Estado" body={statusTemplate} />
          <Column field="priority" header="Prioridad" body={priorityTemplate} />
          <Column field="project" header="Proyecto" />
          <Column style={{ width: "120px" }} field="reporter" header="Reportado por" />
          <Column style={{ width: "120px" }} field="assignee" header="Asignado a" />
          <Column style={{ width: "120px" }} field="created_at" header="Creado" />
          <Column field="updated_at" header="Actualizado" />
          <Column header="" body={(rowData) => ( <Button label="" icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => deleteIncidencia(rowData.id)}/>)} />
        </DataTable>
      </Card>
    </div>
  );
}
