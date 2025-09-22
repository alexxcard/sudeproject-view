"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useRouter } from "next/navigation";

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
  const [proyectos, setProyectos] = useState(proyectosMock);
  const [newProyecto, setNewProyecto] = useState({
    name: "",
    description: "",
    owner: "",
    members: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const addProyecto = () => {
    if (!newProyecto.name || !newProyecto.owner) {
      alert("El nombre y propietario son obligatorios.");
      return;
    }

    const nextId = `p${proyectos.length + 1}`;
    const newItem: Proyecto = {
      id: nextId,
      name: newProyecto.name,
      description: newProyecto.description,
      owner: newProyecto.owner,
      members: newProyecto.members
        ? newProyecto.members.split(",").map((m) => m.trim())
        : [],
      created_at: new Date().toISOString().split("T")[0],
    };

    setProyectos([newItem, ...proyectos]);
    setNewProyecto({ name: "", description: "", owner: "", members: "" });
    setShowDialog(false); // cerramos el modal
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Botón Crear Nuevo Proyecto */}
      <div className="max-w-[1200px] mx-auto mb-4 flex justify-end">
        <Button
          label="Crear Nuevo Proyecto"
          icon="pi pi-plus"
          onClick={() => setShowDialog(true)}
        />
      </div>

      {/* Modal para nuevo proyecto */}
      <Dialog
        header="Agregar Nuevo Proyecto"
        visible={showDialog}
        style={{ width: "400px" }}
        onHide={() => setShowDialog(false)}
      >
        <div className="grid grid-cols-1 gap-3">
          <InputText
            placeholder="Nombre"
            value={newProyecto.name}
            onChange={(e) =>
              setNewProyecto({ ...newProyecto, name: e.target.value })
            }
          />
          <InputText
            placeholder="Propietario"
            value={newProyecto.owner}
            onChange={(e) =>
              setNewProyecto({ ...newProyecto, owner: e.target.value })
            }
          />
          <InputText
            placeholder="Miembros (separados por coma)"
            value={newProyecto.members}
            onChange={(e) =>
              setNewProyecto({ ...newProyecto, members: e.target.value })
            }
          />
          <InputText
            placeholder="Descripción"
            value={newProyecto.description}
            onChange={(e) =>
              setNewProyecto({ ...newProyecto, description: e.target.value })
            }
          />
        </div>
        <Button
          className="mt-3"
          label="Agregar Proyecto"
          onClick={addProyecto}
        />
      </Dialog>

      {/* Botón volver al inicio */}
      <div className="max-w-[1200px] mx-auto mb-4">
        <Button
          label="Volver al inicio"
          icon="pi pi-home"
          onClick={() => router.push("/home")}
        />
      </div>

      {/* Tabla de proyectos */}
      <Card className="max-w-[1200px] mx-auto">
        <h1 className="text-xl text-center font-bold mb-4">
          Listado de Proyectos
        </h1>
        <DataTable
          value={proyectos}
          paginator
          rows={5}
          stripedRows
          responsiveLayout="scroll"
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Nombre" />
          <Column field="description" header="Descripción" />
          <Column field="owner" header="Propietario" />
          <Column
            field="members"
            header="Miembros"
            body={(row) => row.members.join(", ")}
          />
          <Column field="created_at" header="Creado" />
        </DataTable>
      </Card>
    </div>
  );
}
