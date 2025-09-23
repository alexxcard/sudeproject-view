"use client";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { NewUsuario } from "@/types";


interface UsuarioFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: NewUsuario) => void; // ⚡️ no any
}

export default function UsuarioForm({ visible, onHide, onSave }: UsuarioFormProps) {
const [usuario, setUsuario] = useState<NewUsuario>({
  nombre: "",
  correo: "",
  rol: "",
  estado: "Activo",
});
  const handleSave = () => {
    onSave(usuario);
    setUsuario({ nombre: "", correo: "", rol: "", estado: "Activo" });
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
          placeholder="Correo"
          value={usuario.correo}
          onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })}
        />
        <InputText
          placeholder="Rol"
          value={usuario.rol}
          onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
        />
        <Dropdown
          value={usuario.estado}
          options={["Activo", "Inactivo"]}
          onChange={(e) => setUsuario({ ...usuario, estado: e.value })}
          placeholder="Estado"
        />
        <div className="flex gap-2 mt-2">
          <Button label="Guardar" onClick={handleSave} />
          <Button label="Cancelar" className="p-button-secondary" onClick={onHide} />
        </div>
      </div>
    </Dialog>
  );
}
