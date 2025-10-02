"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Sprint {
  id: string;
  name: string;
  goal?: string;
  project: string;   // Nombre del proyecto asociado
  start_date: string;
  end_date: string;
}

// Cambia esta URL por tu endpoint real de Django REST Framework
const API_URL = "http://localhost:8000/sprints/";

export default function SprintsPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();

        // Mapeamos los datos para adaptarlos al frontend
        const mapped: Sprint[] = data.map((s: any) => ({
          id: s.id,
          name: s.name,
          goal: s.goal || "",
          project: s.project?.name || s.project || "", 
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

    fetchSprints();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto">
        <h1 className="text-xl text-center font-bold mb-4">Listado de Sprints</h1>

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
            <Column field="project" header="Proyecto" />
            <Column field="start_date" header="Fecha de inicio" />
            <Column field="end_date" header="Fecha de fin" />
          </DataTable>
        )}
      </Card>
    </div>
  );
}
