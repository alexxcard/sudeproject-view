"use client";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
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
    propietario: "",
    status: "Activo",
    start_date: "",
    end_date: "",
  });

  const handleSave = () => {
    onSave(newProyecto);
    setNewProyecto({
      name: "",
      description: "",
      propietario: "",
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
        <InputText
          placeholder="Propietario"
          value={newProyecto.propietario}
          onChange={(e) => setNewProyecto({ ...newProyecto, propietario: e.target.value })}
        />
        <Dropdown
          value={newProyecto.status}
          options={["Activo", "Inactivo", "En Progreso"]}
          onChange={(e) => setNewProyecto({ ...newProyecto, status: e.value })}
          placeholder="Estado"
        />
        {/* Calendario para fecha inicio */}
        <Calendar
          placeholder="Fecha inicio"
          value={newProyecto.start_date ? new Date(newProyecto.start_date) : null}
          onChange={(e) =>
            setNewProyecto({
              ...newProyecto,
              start_date: e.value ? (e.value as Date).toISOString().split("T")[0] : "",
            })
          }
          dateFormat="yy-mm-dd"
        />
        {/* Calendario para fecha fin */}
        <Calendar
          placeholder="Fecha fin"
          value={newProyecto.end_date ? new Date(newProyecto.end_date) : null}
          onChange={(e) =>
            setNewProyecto({
              ...newProyecto,
              end_date: e.value ? (e.value as Date).toISOString().split("T")[0] : "",
            })
          }
          dateFormat="yy-mm-dd"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <Button label="Guardar" onClick={handleSave} />
        <Button label="Cancelar" className="p-button-secondary" onClick={onHide} />
      </div>
    </Dialog>
  );
}
