"use client";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { NewProyecto } from "@/types";

interface ProyectoFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: NewProyecto) => void;
}

export default function ProyectoForm({ visible, onHide, onSave }: ProyectoFormProps) {
  const [newProyecto, setNewProyecto] = useState<NewProyecto>({
    name: "",
    description: "",
    status: "Activo",
    start_date: "",
    end_date: "",
  });

  const handleSave = () => {
    onSave(newProyecto);
    setNewProyecto({
      name: "",
      description: "",
      status: "Activo",
      start_date: "",
      end_date: "",
    });
    onHide();
  };

  return (
    <Dialog header="Nuevo Proyecto" visible={visible} onHide={onHide} modal>
      <div className="grid grid-cols-1 gap-3">
        <InputText
          placeholder="Nombre"
          value={newProyecto.name}
          onChange={(e) => setNewProyecto({ ...newProyecto, name: e.target.value })}
        />
        <InputText
          placeholder="Descripción"
          value={newProyecto.description}
          onChange={(e) => setNewProyecto({ ...newProyecto, description: e.target.value })}
        />
        <Dropdown
          value={newProyecto.status}
          options={["Activo", "Inactivo", "En Progreso"]}
          onChange={(e) => setNewProyecto({ ...newProyecto, status: e.value })}
          placeholder="Estado"
        />
        <InputText
          placeholder="Fecha inicio"
          value={newProyecto.start_date}
          onChange={(e) => setNewProyecto({ ...newProyecto, start_date: e.target.value })}
        />
        <InputText
          placeholder="Fecha fin"
          value={newProyecto.end_date}
          onChange={(e) => setNewProyecto({ ...newProyecto, end_date: e.target.value })}
        />
      </div>
      <div className="flex gap-2 mt-3">
        <Button label="Guardar" onClick={handleSave} />
        <Button label="Cancelar" className="p-button-secondary" onClick={onHide} />
      </div>
    </Dialog>
  );
}
