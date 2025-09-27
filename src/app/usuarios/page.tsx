"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import UsuarioForm from "@/components/features/UserForm";
import { NewUsuario } from "@/types";
import { Usuario } from "@/interface";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [estadoFilter, setEstadoFilter] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // 🟢 Obtener el token del localStorage
  // const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Traer usuarios desde la API de Django
  useEffect(() => {
    // if (!token) return;

    fetch("http://127.0.0.1:8000/api/users/", {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results || [];
        setUsuarios(results);
      })
      .catch((err) => console.error("Error al traer usuarios:", err));
  }, []);

  // Filtrar usuarios
  const filteredUsuarios = Array.isArray(usuarios)
    ? usuarios.filter((u) => !estadoFilter || u.estado === estadoFilter)
    : [];

  // Eliminar usuario (frontend + backend)
  const deleteUsuario = async (id: string) => {
    // if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
        method: "DELETE",
        // headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsuarios(usuarios.filter((u) => u.id !== id));
      } else {
        console.error("Error al eliminar usuario:", await res.json());
      }
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  // Crear usuario
const addUsuario = async (data: NewUsuario) => {
  try {
    console.log("Enviando al backend:", data);

    const res = await fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // descomenta si usas JWT
        // "Authorization": `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const newUser = await res.json();
      setUsuarios([newUser, ...usuarios]);
      setShowForm(false);
    } else {
      const text = await res.text(); // <-- en vez de json()
      console.error("Error al crear usuario:", text);
    }
  } catch (err) {
    console.error("Error al crear usuario:", err);
  }
};
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="max-w-[1200px] mx-auto shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Usuarios</h1>
          <Button
            label="Nuevo Usuario"
            icon="pi pi-plus"
            onClick={() => setShowForm(true)}
          />
        </div>

        {/* Filtros */}
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

        {/* Tabla */}
        <DataTable
          value={filteredUsuarios}
          paginator
          rows={5}
          stripedRows
          responsiveLayout="scroll"
        >
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="correo" header="Correo" />
          <Column field="role" header="Rol" />
          <Column
            field="estado"
            header="Estado"
            body={(rowData) => (
              <Tag
                value={rowData.estado || "Activo"} // default
                severity={rowData.estado === "Activo" ? "success" : "danger"}
              />
            )}
          />
          <Column
            header="Eliminar"
            body={(rowData) => (
              <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-sm"
                onClick={() => deleteUsuario(rowData.id)}
              />
            )}
          />
        </DataTable>
      </Card>

      <UsuarioForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={addUsuario}
      />
    </div>
  );
}
