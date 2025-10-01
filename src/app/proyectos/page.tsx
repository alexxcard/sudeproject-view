"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Proyecto } from "@/interface";
import { NewProyecto } from "@/types";
import ProyectoForm from "@/components/features/ProyectForm";

interface User {
  id: string;
  username: string;
}

interface ProyectoConNombres extends Proyecto {
  ownerName: string;
  membersNames: string;
}

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [proyectosConNombres, setProyectosConNombres] = useState<ProyectoConNombres[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar usuarios
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error cargando usuarios:", err));
  }, []);

  // Cargar proyectos
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProyectos(data);
        else if (data.results) setProyectos(data.results);
      })
      .catch(err => console.error("Error cargando proyectos:", err));
  }, []);

  // Mapear IDs a nombres cuando ambos datos están listos
  useEffect(() => {
    if (usuarios.length === 0 || proyectos.length === 0) return;

    const mapProyectos: ProyectoConNombres[] = proyectos.map(p => {
      const owner = usuarios.find(u => u.id === p.owner);
      const membersNames = p.members
        ? p.members
            .map((memberId: string) => usuarios.find(u => u.id === memberId)?.username || "Desconocido")
            .join(", ")
        : "Sin miembros";

      return {
        ...p,
        ownerName: owner ? owner.username : "Desconocido",
        membersNames,
      };
    });

    setProyectosConNombres(mapProyectos);
  }, [usuarios, proyectos]);

  const addProyecto = async (data: NewProyecto) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/projects/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear proyecto");
      const nuevo = await res.json();
      setProyectos(prev => [nuevo, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProyectos = proyectosConNombres.filter(
    p => !statusFilter || p.status === statusFilter
  );

  if (usuarios.length === 0 || proyectos.length === 0) return <div>Cargando datos...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow-md mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Listado de Proyectos</h1>
          <div className="flex gap-2">
            <Button
              label="Nuevo Proyecto"
              icon="pi pi-plus"
              onClick={() => setShowForm(true)}
            />
            <Link href="/home">
              <Button label="Volver al inicio" icon="pi pi-home" />
            </Link>
          </div>
        </div>

        {/* Filtro por estado */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Dropdown
            value={statusFilter}
            options={["Activo", "Inactivo", "En Progreso"]}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filtrar por estado"
            showClear
          />
          <Button label="Limpiar filtros" onClick={() => setStatusFilter(null)} />
        </div>

        {/* Tabla de proyectos */}
        <DataTable
          value={filteredProyectos}
          paginator
          rows={5}
          stripedRows
          responsiveLayout="scroll"
          size="small"
        >
          <Column field="name" header="Nombre" />
          <Column field="description" header="Descripción" />
          <Column header="Propietario" body={(row) => row.ownerName} />
          <Column header="Miembros" body={(row) => row.membersNames} />
          <Column field="created_at" header="Creado" />
        </DataTable>
      </Card>

      {/* Modal del formulario */}
      <ProyectoForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={addProyecto}
      />
    </div>
  );
}
