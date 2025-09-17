"use client";
import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pendiente" | "progreso" | "completado";
}

export default function ProjectBoard() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Configurar servidor",
      description: "Configurar NestJS + DB",
      status: "pendiente",
    },
    {
      id: 2,
      title: "Diseñar UI",
      description: "Pantallas en Next.js + Tailwind",
      status: "pendiente",
    },
    {
      id: 3,
      title: "API de usuarios",
      description: "GraphQL con Prisma",
      status: "progreso",
    },
    {
      id: 4,
      title: "Autenticación",
      description: "Login con JWT",
      status: "progreso",
    },
    {
      id: 5,
      title: "Dashboard",
      description: "Gráficos con PrimeReact",
      status: "completado",
    },
  ]);

  const columns = [
    { key: "pendiente", title: "Pendiente", severity: "danger" },
    { key: "progreso", title: "En Progreso", severity: "warning" },
    { key: "completado", title: "Completado", severity: "success" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
      {columns.map((col) => (
        <div key={col.key} className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Tag value={col.title} severity={col.severity as any} />
          </h2>
          {tasks
            .filter((task) => task.status === col.key)
            .map((task) => (
              <Card
                key={task.id}
                title={task.title}
                className="shadow-md"
                subTitle={task.description}
                footer={
                  <div className="flex justify-end">
                    <Button label="Ver" icon="pi pi-eye" size="small" />
                  </div>
                }
              />
            ))}
        </div>
      ))}
    </div>
  );
}
