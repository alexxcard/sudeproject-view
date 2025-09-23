"use client";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { NewIncidencia } from "@/types";

export interface IncidenFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: NewIncidencia) => void;
}
export default function IncidenForm({ visible, onHide, onSave }: IncidenFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    project: "",
    reporter: "",
    assignee: "",
  });

  const handleSave = () => {
    onSave(form);
    setForm({
      title: "",
      description: "",
      status: "Open",
      priority: "Low",
      project: "",
      reporter: "",
      assignee: "",
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
        <InputText
          placeholder="Proyecto"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
        />
        <InputText
          placeholder="Reportado por"
          value={form.reporter}
          onChange={(e) => setForm({ ...form, reporter: e.target.value })}
        />
        <InputText
          placeholder="Asignado a"
          value={form.assignee}
          onChange={(e) => setForm({ ...form, assignee: e.target.value })}
        />
        <Dropdown
          value={form.status}
          options={["Open", "In Progress", "Closed"]}
          onChange={(e) => setForm({ ...form, status: e.value })}
          placeholder="Estado"
        />
        <Dropdown
          value={form.priority}
          options={["Critical", "High", "Medium", "Low"]}
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
