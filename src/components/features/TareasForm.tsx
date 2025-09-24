// src/app/tareas/page.tsx
"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TareaForm, { Tarea, NewTarea } from "@/components/forms/TareaForm";

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
  const [tareas, setTareas] = useState<Tarea[]>(tareasMock);
  const [showForm, setShowForm] = useState(false);

  const addTarea = (data: NewTarea) => {
    const nextId = (tareas.length + 1).toString();
    const newItem: Tarea = {
      id: nextId,
      ...data,
    };
    setTareas([newItem, ...tareas]);
    setShowForm(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Tareas</h1>
          <Button label="Nueva Tarea" icon="pi pi-plus" onClick={() => setShowForm(true)} />
        </div>

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

      {/* Modal */}
      <TareaForm visible={showForm} onHide={() => setShowForm(false)} onSave={addTarea} />
    </div>
  );
}
