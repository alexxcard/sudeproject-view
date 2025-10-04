"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import TareaForm from "@/components/features/TareasForm";

const API_URL = "http://localhost:8000/api/tasks/";

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("access_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

interface User {
  id: string;
  username: string;
}

interface Project {
  id: string;
  name: string;
}

interface Sprint {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "InProgress" | "InReview" | "Done";
  priority: "Low" | "Medium" | "High";
  project: Project | null;
  assignee: User | null;
  sprint: Sprint | null;
  parent: { id: string; title: string } | null;
  dependencies: { id: string; title: string }[];
  created_at: string;
  updated_at: string;
}

// Tipado del formulario (solo IDs)
interface TaskFormData {
  title: string;
  description: string;
  status: "Pending" | "InProgress" | "InReview" | "Done";
  priority: "Low" | "Medium" | "High";
  project: string; // ID
  assignee: string; // ID
  sprint: string; // ID
  parent: string; // ID
  due_date: string;
}

export default function TareasPage() {
  const [tareas, setTareas] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Cargar tareas
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const res = await fetch(API_URL, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: Task[] = await res.json();
        setTareas(data);
      } catch (err) {
        console.error("Error cargando tareas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTareas();
  }, []);

  // 🔹 Crear tarea (mapear IDs a objetos)
// 🔹 Crear tarea (mandar IDs planos en vez de objetos)
const addTarea = async (formData: TaskFormData) => {
  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      project_id: formData.project || null,
      assignee_id: formData.assignee || null,
      sprint_id: formData.sprint || null,
      parent_id: formData.parent || null,
      due_date: formData.due_date || null,
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const tareaCreada: Task = await res.json();
    setTareas([tareaCreada, ...tareas]);
    setShowForm(false);
  } catch (err) {
    console.error("Error al crear tarea:", err);
  }
};


  // 🔹 Eliminar tarea
  const deleteTarea = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setTareas(tareas.filter((t) => t.id !== id));
      } else {
        const text = await res.text();
        console.error("Error al eliminar tarea:", text);
      }
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  // 🔹 Renderizar estado con colores
  const statusTemplate = (row: Task) => {
    const map = {
      Pending: { label: "Pendiente", severity: "info" },
      InProgress: { label: "En progreso", severity: "warning" },
      InReview: { label: "En revisión", severity: "secondary" },
      Done: { label: "Completada", severity: "success" },
    } as const;

    const { label, severity } = map[row.status] || {
      label: row.status,
      severity: "contrast",
    };

    return <Tag value={label} severity={severity} />;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Tareas</h1>
          <Button
            label="Nueva Tarea"
            icon="pi pi-plus"
            onClick={() => setShowForm(true)}
          />
        </div>

        {loading ? (
          <p className="text-center">Cargando tareas...</p>
        ) : (
          <DataTable
            value={tareas}
            paginator
            rows={5}
            stripedRows
            responsiveLayout="scroll"
          >
            <Column field="title" header="Título" />
            <Column field="description" header="Descripción" />
            <Column header="Estado" body={statusTemplate} />
            <Column field="priority" header="Prioridad" />
            <Column
              header="Proyecto"
              body={(row: Task) => row.project?.name || "Sin proyecto"}
            />
            <Column
              header="Asignado a"
              body={(row: Task) => row.assignee?.username || "Sin asignar"}
            />
            <Column
              header="Sprint"
              body={(row: Task) => row.sprint?.name || "Sin sprint"}
            />
            <Column
              header="Padre"
              body={(row: Task) => row.parent?.title || "Sin padre"}
            />
            <Column
              header="Dependencias"
              body={(row: Task) =>
                row.dependencies.length > 0
                  ? row.dependencies.map((d) => d.title).join(", ")
                  : "Sin dependencias"
              }
            />
            <Column field="created_at" header="Creación" />
            <Column field="updated_at" header="Actualización" />
            <Column
              header="Acciones"
              body={(row: Task) => (
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger p-button-sm"
                  onClick={() => deleteTarea(row.id)}
                />
              )}
            />
          </DataTable>
        )}
      </Card>

      {/* Modal de creación */}
      <Dialog
        header="Nueva Tarea"
        visible={showForm}
        style={{ width: "600px" }}
        modal
        onHide={() => setShowForm(false)}
      >
        <TareaForm onSubmit={addTarea} onCancel={() => setShowForm(false)} />
      </Dialog>
    </div>
  );
}
