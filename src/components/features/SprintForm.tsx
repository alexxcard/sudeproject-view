"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

// Interfaces
interface ProjectOption {
  id: string;
  name: string;
}

interface SprintFormProps {
  sprint?: Partial<SprintFormData>; // opcional para editar
  onSubmit: (sprint: SprintFormData) => void;
  onCancel?: () => void;
}

export interface SprintFormData {
  name: string;
  goal: string;
  project: string; // id del proyecto
  start_date: string;
  end_date: string;
}

export default function SprintForm({ sprint, onSubmit, onCancel }: SprintFormProps) {
  const [formData, setFormData] = useState<SprintFormData>({
    name: sprint?.name || "",
    goal: sprint?.goal || "",
    project: sprint?.project || "",
    start_date: sprint?.start_date || "",
    end_date: sprint?.end_date || "",
  });

  const [projects, setProjects] = useState<ProjectOption[]>([]);

  // Cargar proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/projects/");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setProjects(data.map((p: any) => ({ id: p.id, name: p.name })));
      } catch (err) {
        console.error("Error cargando proyectos:", err);
      }
    };
    fetchProjects();
  }, []);

  // Manejo de cambios en inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-4">{sprint ? "Editar Sprint" : "Nuevo Sprint"}</h2>

      {/* Nombre */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Objetivo */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Objetivo</label>
        <textarea
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Proyecto */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Proyecto</label>
        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Fechas */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Fecha de inicio</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Fecha de fin</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Botones */}
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
          {sprint ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
