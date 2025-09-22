"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Tarea {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  due_date: string;
}

const tareasMock: Tarea[] = [
  {
    id: "t1",
    title: "Diseño de UI",
    description: "Crear componentes principales",
    status: "Open",
    priority: "High",
    assignee: "María Gómez",
    due_date: "2025-09-25",
  },
  {
    id: "t2",
    title: "Integración API",
    description: "Conectar frontend con backend",
    status: "In Progress",
    priority: "Medium",
    assignee: "Pedro Torres",
    due_date: "2025-09-28",
  },
];

export default function TareasPage() {
  const [tareas] = useState(tareasMock);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto">
        <h1 className="text-xl text-center font-bold mb-4">Listado de Tareas</h1>
        <DataTable value={tareas} paginator rows={5} stripedRows responsiveLayout="scroll">
          <Column field="id" header="ID" />
          <Column field="title" header="Título" />
          <Column field="description" header="Descripción" />
          <Column field="status" header="Estado" />
          <Column field="priority" header="Prioridad" />
          <Column field="assignee" header="Asignado a" />
          <Column field="due_date" header="Fecha límite" />
        </DataTable>
      </Card>
    </div>
  );
}
