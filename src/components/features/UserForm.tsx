"use client";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

interface UsuarioFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: any) => void; // luego lo tipamos con tu NewUsuario actualizado
}

export default function UsuarioForm({ visible, onHide, onSave }: UsuarioFormProps) {
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    correo: "",
    role: "Member",
  });

  const handleSave = () => {
    onSave(usuario);
    setUsuario({
      username: "",
      password: "",
      nombre: "",
      apellido: "",
      correo: "",
      role: "Member",
    });
  };

  return (
    <Dialog header="Agregar Nuevo Usuario" visible={visible} onHide={onHide} modal>
      <div className="flex flex-col gap-3">

        <InputText
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
        />
        <InputText
          placeholder="Apellido"
          value={usuario.apellido}
          onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
        />
        <InputText
          placeholder="Correo"
          value={usuario.correo}
          onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })}
        />
        <Dropdown
          value={usuario.role}
          options={["Admin", "PM", "Member"]}
          onChange={(e) => setUsuario({ ...usuario, role: e.value })}
          placeholder="Rol"
        />
        <div className="flex gap-2 mt-2">
          <Button label="Guardar" onClick={handleSave} />
          <Button label="Cancelar" className="p-button-secondary" onClick={onHide} />
        </div>
      </div>
    </Dialog>
  );
}
