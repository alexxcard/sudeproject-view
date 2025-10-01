"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Tarea } from "@/interface"; // Ajusta tu interfaz
import TareaForm from "@/components/features/TareasForm";
import { apiGet } from "../services/api";

const API_URL = "http://localhost:8000/api/tasks/"; // URL de tu backend Django

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Cargar tareas desde backend
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const res = await apiGet(API_URL);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();

        // Mapear datos al frontend
        const mapped: Tarea[] = data.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description || "",
          status: t.status,
          priority: t.priority,
          project: t.project ? t.project.name : "Sin proyecto",
          assignee: t.assignee ? t.assignee.username : "Sin asignar",
          due_date: t.due_date || "",
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
  const addTarea = async (nuevaTarea: Tarea) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTarea),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error al crear tarea:", text);
        return;
      }

      const tareaCreada = await res.json();
      setTareas([tareaCreada, ...tareas]);
      setShowForm(false);
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };

  // 🔹 Eliminar tarea
  const deleteTarea = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
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
            <Column field="id" header="ID" />
            <Column field="title" header="Título" />
            <Column field="description" header="Descripción" />
            <Column
              field="status"
              header="Estado"
              body={(rowData) => (
                <Tag
                  value={rowData.status}
                  severity={
                    rowData.status === "Open"
                      ? "info"
                      : rowData.status === "In Progress"
                      ? "warning"
                      : "success"
                  }
                />
              )}
            />
            <Column field="priority" header="Prioridad" />
            <Column field="project" header="Proyecto" />
            <Column field="assignee" header="Asignado a" />
            <Column field="due_date" header="Fecha límite" />
            <Column
              header="Eliminar"
              body={(rowData) => (
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

      {/* Modal del formulario */}
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
