export interface LoginFormValues {
  username: string;
  password: string;
}

export interface TableProps<T> {
  dataSource: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectedRowKeys?: (string | number)[];
  setSelectedRowKeys?: (keys: (string | number)[]) => void;
  pagination?: {
    pageSize: number;
    current: number;
    total: number;
    onChange: (page: number) => void;
  };
}

// src/interface/index.ts
export interface NewIncidencia {
  title: string;
  description: string;
  status: "Open" | "Assigned" | "Resolved" | "Closed";
  priority: "High" | "Medium" | "Low";
  project_id: string;   // ID del proyecto
  reporter_id: string;  // ID del usuario que reporta
  assignee_id?: string | null; // ID del usuario asignado
}



// src/interface/proyecto.ts
export interface Proyecto {
  id: string;
  name: string;
  description: string;
  created_at: string;
  owner: string;         // id del propietario
  members: string[];     // array de ids de miembros
  status?: string;
}



export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

interface TareaBackend {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "InProgress" | "InReview" | "Done";
  priority: "Low" | "Medium" | "High";
  project?: { name: string } | null;
  assignee?: { username: string } | null;
  due_date?: string | null;
  created_at: string;
  updated_at: string;
}

