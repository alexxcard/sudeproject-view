"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export interface IncidentFormData {
  title: string;
  description: string;
  status: "Open" | "Assigned" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High";
  project: string; // id del proyecto
  reporter: string; // id del usuario reportero
  assignee?: string | null; // id del usuario asignado
}

interface UsuarioOption {
  id: string;
  nombre: string;
}

interface ProyectoOption {
  id: string;
  name: string;
}

interface IncidentFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: IncidentFormData) => void;
}

export default function IncidentForm({ visible, onHide, onSave }: IncidentFormProps) {
  const [form, setForm] = useState<IncidentFormData>({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    project: "",
    reporter: "",
    assignee: null,
  });

  const [proyectos, setProyectos] = useState<ProyectoOption[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioOption[]>([]);

  // 🔹 Cargar proyectos y usuarios
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/projects/");
        const data = await res.json();
        setProyectos(data.map((p: any) => ({ id: p.id, name: p.name })));
      } catch (err) {
        console.error("Error fetching proyectos:", err);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/");
        const data = await res.json();
        setUsuarios(data.map((u: any) => ({ id: u.id, nombre: u.username })));
      } catch (err) {
        console.error("Error fetching usuarios:", err);
      }
    };

    fetchProyectos();
    fetchUsuarios();
  }, []);

  const handleSave = () => {
    if (!form.title || !form.project || !form.reporter) {
      alert("Título, proyecto y reportero son obligatorios");
      return;
    }

    onSave(form);

    setForm({
      title: "",
      description: "",
      status: "Open",
      priority: "Low",
      project: "",
      reporter: "",
      assignee: null,
    });

    onHide();
  };

  return (
    <Dialog header="Nueva Incidencia" visible={visible} style={{ width: "600px" }} modal onHide={onHide}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputText
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <Dropdown
          value={form.project}
          options={proyectos}
          onChange={(e) => setForm({ ...form, project: e.value })}
          optionLabel="name"
          optionValue="id"   // 👈 Esto asegura que solo se guarde el id
          placeholder="Selecciona un proyecto"
        />

        <Dropdown
          value={form.reporter}
          options={usuarios}
          onChange={(e) => setForm({ ...form, reporter: e.value })}
          optionLabel="nombre"
          optionValue="id"   // 👈 Igual aquí, solo se guarda el id del usuario
          placeholder="Selecciona miembro"
        />

        <Dropdown
          value={form.assignee}
          options={usuarios}
          onChange={(e) => setForm({ ...form, assignee: e.value })}
          optionLabel="nombre"
          optionValue="id"   // 👈 también para el asignado
          placeholder="Asignar a (opcional)"
          showClear
        />

        <Dropdown
          value={form.status}
          options={["Open", "Assigned", "Resolved", "Closed"]}
          onChange={(e) => setForm({ ...form, status: e.value })}
          placeholder="Estado"
        />

        <Dropdown
          value={form.priority}
          options={["Low", "Medium", "High"]}
          onChange={(e) => setForm({ ...form, priority: e.value })}
          placeholder="Prioridad"
        />

        <InputTextarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descripción"
          rows={3}
          className="col-span-2"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button label="Cancelar" className="p-button-secondary" onClick={onHide} />
        <Button label="Guardar" onClick={handleSave} />
      </div>
    </Dialog>
  );
}
