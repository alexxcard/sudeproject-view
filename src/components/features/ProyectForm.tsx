"use client";

import { useState, useEffect } from "react";
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

interface UserOption {
  id: string;
  username: string;
}

export default function ProyectoForm({ visible, onHide, onSave }: ProyectoFormProps) {
  const [newProyecto, setNewProyecto] = useState<NewProyecto>({
    name: "",
    description: "",
    owner: "", // Aquí guardamos el id del usuario
  });

  const [users, setUsers] = useState<UserOption[]>([]);

  // Cargar usuarios del backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        }
      })
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  const handleSave = () => {
    onSave(newProyecto);
    setNewProyecto({
      name: "",
      description: "",
      owner: "",
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
          value={newProyecto.owner}
          options={users.map((u) => ({ label: u.username, value: u.id }))}
          onChange={(e) => setNewProyecto({ ...newProyecto, owner: e.value })}
          placeholder="Seleccionar propietario"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <Button label="Guardar" onClick={handleSave} />
        <Button label="Cancelar" className="p-button-secondary" onClick={onHide} />
      </div>
    </Dialog>
  );
}
