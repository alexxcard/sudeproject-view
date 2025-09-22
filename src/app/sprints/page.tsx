"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

interface Sprint {
  id: string;
  name: string;
  description: string;
  project: string;
  start_date: string;
  end_date: string;
  status: "Planned" | "Active" | "Completed";
}

const sprintsMock: Sprint[] = [
  {
    id: "s1",
    name: "Sprint 1",
    description: "Primer sprint del proyecto Sistema Web",
    project: "Sistema Web",
    start_date: "2025-09-01",
    end_date: "2025-09-15",
    status: "Completed",
  },
  {
    id: "s2",
    name: "Sprint 2",
    description: "Segundo sprint del proyecto Sistema Web",
    project: "Sistema Web",
    start_date: "2025-09-16",
    end_date: "2025-09-30",
    status: "Active",
  },
  {
    id: "s3",
    name: "Sprint 1",
    description: "Sprint inicial del Gestor de Reportes",
    project: "Gestor de Reportes",
    start_date: "2025-09-05",
    end_date: "2025-09-20",
    status: "Planned",
  },
];

export default function SprintsPage() {
  const [sprints] = useState(sprintsMock);

  const statusTemplate = (rowData: Sprint) => {
    let severity: "info" | "success" | "warning" = "info";
    if (rowData.status === "Completed") severity = "success";
    if (rowData.status === "Active") severity = "warning";
    return <Tag value={rowData.status} severity={severity} />;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto">
        <h1 className="text-xl text-center font-bold mb-4">Listado de Sprints</h1>
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
          <Column field="description" header="Descripción" />
          <Column field="project" header="Proyecto" />
          <Column field="start_date" header="Fecha de inicio" />
          <Column field="end_date" header="Fecha de fin" />
          <Column field="status" header="Estado" body={statusTemplate} />
        </DataTable>
      </Card>
    </div>
  );
}
