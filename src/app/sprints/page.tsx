"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SprintForm, { SprintFormData } from "@/components/features/SprintForm";

// 🔹 URL de tu API Django REST Framework
const API_URL = "http://localhost:8000/api/sprints/";

// Interfaces según tu modelo Django
interface Project {
  id: string;
  name: string;
}

interface Sprint {
  id: string;
  name: string;
  goal?: string;
  project: Project | null;
  start_date: string;
  end_date: string;
}

export default function SprintsPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("access_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  // 🔹 Cargar sprints
  const fetchSprints = async () => {
    try {
      const res = await fetch(API_URL, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();

      const mapped: Sprint[] = data.map((s: any) => ({
        id: s.id,
        name: s.name,
        goal: s.goal || "",
        project: s.project ? { id: s.project.id, name: s.project.name } : null,
        start_date: s.start_date,
        end_date: s.end_date,
      }));

      setSprints(mapped);
    } catch (err) {
      console.error("Error cargando sprints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSprints();
  }, []);

  // 🔹 Crear / Editar sprint
  const saveSprint = async (sprintData: SprintFormData) => {
    try {
      const method = selectedSprint ? "PUT" : "POST";
      const url = selectedSprint ? `${API_URL}${selectedSprint.id}/` : API_URL;

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(sprintData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      await fetchSprints();
      setShowForm(false);
    } catch (err) {
      console.error("Error guardando sprint:", err);
    }
  };

  // 🔹 Eliminar sprint
  const deleteSprint = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      setSprints(sprints.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error eliminando sprint:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Sprints</h1>
          <Button
            label="Nuevo Sprint"
            icon="pi pi-plus"
            onClick={() => {
              setSelectedSprint(null);
              setShowForm(true);
            }}
          />
        </div>

        {loading ? (
          <p className="text-center">Cargando sprints...</p>
        ) : (
          <DataTable
            value={sprints}
            paginator
            rows={5}
            stripedRows
            responsiveLayout="scroll"
            scrollable
            scrollHeight="400px"
          >
            <Column field="id" header="ID" />
            <Column field="name" header="Nombre" />
            <Column field="goal" header="Objetivo" />
            <Column
              header="Proyecto"
              body={(row: Sprint) => row.project?.name || "Sin proyecto"}
            />
            <Column field="start_date" header="Fecha de inicio" />
            <Column field="end_date" header="Fecha de fin" />
            <Column
              header="Acciones"
              body={(row: Sprint) => (
                <div className="flex gap-2">
                  <Button
                    icon="pi pi-pencil"
                    className="p-button-warning p-button-sm"
                    onClick={() => {
                      setSelectedSprint(row);
                      setShowForm(true);
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-sm"
                    onClick={() => deleteSprint(row.id)}
                  />
                </div>
              )}
            />
          </DataTable>
        )}
      </Card>

      {/* Modal de creación / edición */}
      <Dialog
        header={selectedSprint ? "Editar Sprint" : "Nuevo Sprint"}
        visible={showForm}
        style={{ width: "600px" }}
        modal
        onHide={() => setShowForm(false)}
      >
        <SprintForm
          sprint={
            selectedSprint
              ? {
                  name: selectedSprint.name,
                  goal: selectedSprint.goal || "",
                  project: selectedSprint.project?.id || "",
                  start_date: selectedSprint.start_date,
                  end_date: selectedSprint.end_date,
                }
              : undefined
          }
          onSubmit={saveSprint}
          onCancel={() => setShowForm(false)}
        />
      </Dialog>
    </div>
  );
}
