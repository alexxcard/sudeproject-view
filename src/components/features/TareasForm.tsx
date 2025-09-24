"use client";
import { Tarea } from "@/interface";
import { useState, ChangeEvent, FormEvent } from "react";


interface TareaFormProps {
  tarea?: Tarea;
  onSubmit: (tarea: Tarea) => void;
  onCancel?: () => void;
}

export default function TareaForm({ tarea, onSubmit, onCancel }: TareaFormProps) {
  const [formData, setFormData] = useState<Tarea>({
    id: tarea?.id || "",
    title: tarea?.title || "",
    description: tarea?.description || "",
    status: tarea?.status || "Open",
    priority: tarea?.priority || "Medium",
    assignee: tarea?.assignee || "",
    due_date: tarea?.due_date || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg mx-auto mb-6">
      <h2 className="text-lg font-bold mb-4">{tarea ? "Editar Tarea" : "Nueva Tarea"}</h2>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Prioridad</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Asignado a</label>
        <input
          type="text"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Fecha límite</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {tarea ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
