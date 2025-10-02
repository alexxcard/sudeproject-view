"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { TareaBackend } from "@/interface"; 
import TareaForm from "@/components/features/TareasForm";
import { IncidentFormData } from "@/components/features/IncidentForm";

const API_URL = "http://localhost:8000/api/tasks/";

export default function TareasPage() {
  const [tareas, setTareas] = useState<TareaBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Cargar tareas desde backend con cookies
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          credentials: "include", // 👈 ENVÍA cookies de sesión
        });

        if (!res.ok) throw new Error(res.statusText);

        const data: TareaBackend[] = await res.json();

        const mapped: TareaBackend[] = data.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description || "",
          status: t.status,
          priority: t.priority,
          project: t.project ? { name: t.project.name } : { name: "Sin proyecto" },
          assignee: t.assignee ? { username: t.assignee.username } : { username: "Sin asignar" },
          sprint: t.sprint ? { name: t.sprint.name } : { name: "Sin sprint" },
          parent: t.parent ? { title: t.parent.title } : null,
          dependencies: t.dependencies || [],
          created_at: t.created_at,
          updated_at: t.updated_at,
        }));

        setTareas(mapped);
      } catch (err) {
        console.error("Error cargando tareas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTareas();
  }, []);

  // 🔹 Crear nueva tarea
  const addTarea = async (nuevaTarea: TareaBackend) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 cookies
        body: JSON.stringify({ username: "tu_usuario", password: "tu_password" }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error al crear tarea:", text);
        return;
      }

      const tareaCreada: TareaBackend = await res.json();
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
        credentials: "include", // 👈 cookies
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
  
  const addIncidencia = async (incidencia: IncidentFormData) => {
  try {
    const token = localStorage.getItem("access_token"); // o donde guardes tu JWT
    const res = await fetch("http://localhost:8000/api/incidents/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // 🔹 token JWT
      },
      body: JSON.stringify(incidencia),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const nueva = await res.json();
    // Aquí actualizas tu lista o estado
    return nueva;
  } catch (err) {
    console.error("Error creando incidencia:", err);
  }
};

  // 🔹 Render Estado con colores
  const statusTemplate = (rowData: TareaBackend) => {
    let severity: "info" | "warning" | "success" | "danger" | "secondary" | "contrast" = "info";
    let displayStatus = "";

    switch (rowData.status) {
      case "Pending":
        severity = "info";
        displayStatus = "Pendiente";
        break;
      case "InProgress":
        severity = "warning";
        displayStatus = "En progreso";
        break;
      case "InReview":
        severity = "secondary";
        displayStatus = "En revisión";
        break;
      case "Done":
        severity = "success";
        displayStatus = "Completada";
        break;
      default:
        severity = "info";
        displayStatus = rowData.status;
    }

    return <Tag value={displayStatus} severity={severity} />;
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
            <Column field="project.name" header="Proyecto" />
            <Column field="assignee.username" header="Asignado a" />
            <Column field="sprint.name" header="Sprint" />
            <Column field="created_at" header="Creación" />
            <Column field="updated_at" header="Actualización" />

            <Column
              header="Acciones"
              body={(rowData: TareaBackend) => (
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger p-button-sm"
                  onClick={() => deleteTarea(rowData.id)}
                />
              )}
            />
          </DataTable>
        )}
      </Card>

      <Dialog
        header="Nueva Tarea"
        visible={showForm}
        style={{ width: "600px" }}
        modal
        onHide={() => setShowForm(false)}
        className="p-fluid"
      >
        <TareaForm onSubmit={addTarea} onCancel={() => setShowForm(false)} />
      </Dialog>
    </div>
  );
}
