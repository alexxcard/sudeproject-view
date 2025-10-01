"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { NewIncidencia } from "@/interface";

// Interfaces para dropdown
interface UsuarioOption {
  id: string;
  nombre: string;
}

interface ProyectoOption {
  id: string;
  name: string;
}

export interface IncidenFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: NewIncidencia) => void;
}

export default function IncidenForm({ visible, onHide, onSave }: IncidenFormProps) {
  const [form, setForm] = useState<NewIncidencia>({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    project_id: "",
    reporter_id: "",
    assignee_id: null,
  });

  const [proyectos, setProyectos] = useState<ProyectoOption[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioOption[]>([]);

  // 🔹 Cargar proyectos y usuarios desde backend
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch("http://localhost:8000/projects/");
        const data = await res.json();
        setProyectos(data.map((p: any) => ({ id: p.id, name: p.name })));
      } catch (err) {
        console.error("Error fetching proyectos:", err);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/");
        const data = await res.json();
        setUsuarios(data.map((u: any) => ({ id: u.id, nombre: u.nombre })));
      } catch (err) {
        console.error("Error fetching usuarios:", err);
      }
    };

    fetchProyectos();
    fetchUsuarios();
  }, []);

  const handleSave = () => {
    if (!form.title || !form.project_id || !form.reporter_id) {
      alert("Título, proyecto y reportero son obligatorios");
      return;
    }

    onSave(form);

    setForm({
      title: "",
      description: "",
      status: "Open",
      priority: "Low",
      project_id: "",
      reporter_id: "",
      assignee_id: null,
    });

    onHide();
  };

  return (
    <Dialog
      header="Nueva Incidencia"
      visible={visible}
      style={{ width: "600px" }}
      modal
      onHide={onHide}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputText
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <Dropdown
          value={form.project_id}
          options={proyectos}
          onChange={(e) => setForm({ ...form, project_id: e.value })}
          optionLabel="name"
          placeholder="Selecciona un proyecto"
        />

        <Dropdown
          value={form.reporter_id}
          options={usuarios}
          onChange={(e) => setForm({ ...form, reporter_id: e.value })}
          optionLabel="nombre"
          placeholder="Selecciona reportero"
        />

        <Dropdown
          value={form.assignee_id}
          options={usuarios}
          onChange={(e) => setForm({ ...form, assignee_id: e.value })}
          optionLabel="nombre"
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
          options={["High", "Medium", "Low"]}
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
