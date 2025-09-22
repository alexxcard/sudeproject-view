"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Proyecto {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: string[];
  created_at: string;
}

const proyectosMock: Proyecto[] = [
  {
    id: "p1",
    name: "Sistema Web",
    description: "Proyecto principal de la empresa",
    owner: "Juan Pérez",
    members: ["María Gómez", "Pedro Torres"],
    created_at: "2025-09-01",
  },
  {
    id: "p2",
    name: "Gestor de Reportes",
    description: "Generación y descarga de reportes",
    owner: "Luis Fernández",
    members: ["Carlos Díaz", "Laura García"],
    created_at: "2025-09-05",
  },
];

export default function ProyectosPage() {
  const [proyectos] = useState(proyectosMock);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto">
        <h1 className="text-xl text-center font-bold mb-4">Listado de Proyectos</h1>
        <DataTable value={proyectos} paginator rows={5} stripedRows responsiveLayout="scroll">
          <Column field="id" header="ID" />
          <Column field="name" header="Nombre" />
          <Column field="description" header="Descripción" />
          <Column field="owner" header="Propietario" />
          <Column field="members" header="Miembros" body={(row) => row.members.join(", ")} />
          <Column field="created_at" header="Creado" />
        </DataTable>
      </Card>
    </div>
  );
}
