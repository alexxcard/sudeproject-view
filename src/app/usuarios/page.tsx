"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Usuario } from "@/interface";
import UsuarioForm from "@/components/features/UserForm";
import { NewUsuario } from "@/types";


const usuariosMock: Usuario[] = [
  { id: "u1", nombre: "Juan Pérez", correo: "juan@example.com", rol: "Admin", estado: "Activo", created_at: "2025-09-01", updated_at: "2025-09-01" },
  { id: "u2", nombre: "María Gómez", correo: "maria@example.com", rol: "Editor", estado: "Inactivo", created_at: "2025-09-05", updated_at: "2025-09-05" },
  { id: "u3", nombre: "Pedro Torres", correo: "pedro@example.com", rol: "Viewer", estado: "Activo", created_at: "2025-09-07", updated_at: "2025-09-07" },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [estadoFilter, setEstadoFilter] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredUsuarios = usuarios.filter(
    (u) => !estadoFilter || u.estado === estadoFilter
  );

  const deleteUsuario = (id: string) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

const addUsuario = (data: NewUsuario) => {
  const nextId = (usuarios.length + 1).toString();
  const newItem: Usuario = {
    id: nextId,
    nombre: data.nombre,
    correo: data.correo,
    rol: data.rol,
    estado: data.estado,
    created_at: new Date().toISOString().split("T")[0],
    updated_at: new Date().toISOString().split("T")[0],
  };
  setUsuarios([newItem, ...usuarios]);
  setShowForm(false);
};




  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Usuarios</h1>
          <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={() => setShowForm(true)} />
        </div>

        <div className="flex gap-3 mb-4">
          <Dropdown
            value={estadoFilter}
            options={["Activo", "Inactivo"]}
            onChange={(e) => setEstadoFilter(e.value)}
            placeholder="Filtrar por estado"
            showClear
          />
          <Button label="Limpiar filtros" onClick={() => setEstadoFilter(null)} />
        </div>

        <DataTable value={filteredUsuarios} paginator rows={5} stripedRows responsiveLayout="scroll">
          <Column field="nombre" header="Nombre" />
          <Column field="correo" header="Correo" />
          <Column field="rol" header="Rol" />
          <Column
            field="estado"
            header="Estado"
            body={(rowData) => (
              <Tag value={rowData.estado} severity={rowData.estado === "Activo" ? "success" : "danger"} />
            )}
          />
          <Column field="created_at" header="Creado" />
          <Column field="updated_at" header="Actualizado" />
          <Column
            header="Eliminar"
            body={(rowData) => (
              <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => deleteUsuario(rowData.id)} />
            )}
          />
        </DataTable>
      </Card>

      <UsuarioForm visible={showForm} onHide={() => setShowForm(false)} onSave={addUsuario} />
    </div>
  );
}
