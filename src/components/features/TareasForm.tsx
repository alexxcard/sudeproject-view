"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

// Interfaces para usuarios, proyectos y sprints
interface UserOption {
  id: string;
  username: string;
}

interface ProjectOption {
  id: string;
  name: string;
}

interface SprintOption {
  id: string;
  name: string;
}

// Tipado del formulario
interface TaskFormData {
  title: string;
  description: string;
  status: "Pending" | "InProgress" | "InReview" | "Done";
  priority: "Low" | "Medium" | "High";
  project: string; // solo el ID
  assignee: string; // solo el ID
  sprint: string; // solo el ID
  parent: string; // solo el ID
  due_date: string;
}

// Props del componente
interface TareaFormProps {
  tarea?: Partial<TaskFormData>; // opcional para editar
  onSubmit: (tarea: TaskFormData) => void;
  onCancel?: () => void;
}

// Helper para headers con JWT
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("access_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export default function TareaForm({ tarea, onSubmit, onCancel }: TareaFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: tarea?.title || "",
    description: tarea?.description || "",
    status: tarea?.status || "Pending",
    priority: tarea?.priority || "Medium",
    project: tarea?.project || "",
    assignee: tarea?.assignee || "",
    sprint: tarea?.sprint || "",
    parent: tarea?.parent || "",
    due_date: tarea?.due_date || "",
  });

  const [users, setUsers] = useState<UserOption[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [sprints, setSprints] = useState<SprintOption[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/", {
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setUsers(data.map((u: any) => ({ id: u.id, username: u.username })));
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };

    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/projects/", {
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setProjects(data.map((p: any) => ({ id: p.id, name: p.name })));
      } catch (err) {
        console.error("Error cargando proyectos:", err);
      }
    };

    const fetchSprints = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/sprints/", {
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setSprints(data.map((s: any) => ({ id: s.id, name: s.name })));
      } catch (err) {
        console.error("Error cargando sprints:", err);
      }
    };

    fetchUsers();
    fetchProjects();
    fetchSprints();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-lg mx-auto mb-6"
    >
      <h2 className="text-lg font-bold mb-4">
        {tarea ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      {/* Título */}
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

      {/* Descripción */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Estado */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="Pending">Pendiente</option>
          <option value="InProgress">En progreso</option>
          <option value="InReview">En revisión</option>
          <option value="Done">Completada</option>
        </select>
      </div>

      {/* Prioridad */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Prioridad</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="High">Alta</option>
          <option value="Medium">Media</option>
          <option value="Low">Baja</option>
        </select>
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

      {/* Asignado a */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Asignado a</label>
        <select
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Sin asignar</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      {/* Sprint */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Sprint</label>
        <select
          name="sprint"
          value={formData.sprint}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Sin sprint</option>
          {sprints.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha límite */}
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
          {tarea ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
