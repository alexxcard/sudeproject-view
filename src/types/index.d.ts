export type ProfileProps = {
  session: string | undefined;
  name: string | undefined;
};

export type RowDataPriority = {
  priority: "Critical" | "High" | "Medium" | "Low";
};

export type RowDataStatus = {
  status: "Open" | "In Progress" | "Closed";
};

// src/types/index.ts
import { Incidencia } from "@/interface";

export type NewIncidencia = Omit<
  Incidencia,
  "id" | "created_at" | "updated_at"
>;

import { Proyecto } from "@/interface/proyecto";

export type NewProyecto = Omit<Proyecto, "id" | "created_at" | "updated_at">;

export type NewUsuario = Omit<Usuario, "id" | "created_at" | "updated_at">;